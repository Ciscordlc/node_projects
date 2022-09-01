const Product = require('../models/product')

const getAllProductsStatic = async (req, res) => {
    const products = await Product
        .find({ price: { $gt: 30 } })
        .sort('price')
        .select('name price')
    res.status(200).json({ nbHits: products.length, products })
}

const getAllProducts = async (req, res) => {
    const { 
        featured, 
        company, 
        name,
        sort,
        fields,
        numericFilters,
    } = req.query
    const queryObject = {}

    // Filters
    if (featured){
        queryObject.featured = featured === 'true' ? true: false
    }
    if (company){
        queryObject.company = company
    }
    if (name){
        queryObject.name = { $regex: name, $options: 'i' }
    }
    if (numericFilters){
        const options = ['price', 'rating']
        const regEx = /\b(<|<=|=|>=|>)\b/g
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<=': '$lte',
            '<': '$lt',
        }
        let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`)
        filters = filters
            .split(',')
            .forEach((item) => {
                const [field, operator, value] = item.split('-')
                if (options.includes(field)){
                    queryObject[field] = { [operator]: Number(value) }
            }
        })
    }

    let results = Product.find(queryObject)

    // Sortation and limiting fields
    if (sort){
        const sortList = sort.split(',').join(' ')
        results = results.sort(sortList)
    } else {
        results = results.sort('createdAt')
    }
    if (fields){
        const fieldsList = fields.split(',').join(' ')
        results = results.select(fieldsList)
    }

    // Pages
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit
    
    // Results
    results = results.skip(skip).limit(limit)

    const products = await results
    res.status(200).json({ nbHits: products.length, products })
}

module.exports = { 
    getAllProducts, 
    getAllProductsStatic 
}
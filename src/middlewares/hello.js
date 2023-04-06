function hello(request, response, next) {
    console.log("Bem vindo")
    
    next()
}

module.exports = hello

const getToken = (req) =>{

    const auhtHeader = req.headers.authorization
    const token = auhtHeader.split(" ")[1]

    return token

}
module.exports = getToken
const config = {
    user :'sa',
    password :'*****',
    server:'192.168.18.203',
    database:'BDTEST',
    options:{
        trustedconnection: false,
        enableArithAbort : true, 
        encrypt:false
        //instancename :'/'  En caso se tenga alguna instancia
    }
}

module.exports = config; 
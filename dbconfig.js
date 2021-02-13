const config = {
    user :'sa',
    password :'*vo.2015',
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
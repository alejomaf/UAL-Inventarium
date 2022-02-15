var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ualinventarium@gmail.com',
        pass: 'oxgwjgfbieutqddt'
    }
});

async function recuperar_contrasena(direccion, url, nombre) {
    var mailOptions = {
        from: 'UAL Inventarium',
        to: direccion,
        subject: 'Recuperar contraseña',
        html: 'Estimado ' + nombre + '<br>Para poder recuperar su contraseña tiene que acceder al siguiente enlace:  <a href="' + url + '">Pulsa aquí para recuperar su contraseña</a> <br><br>Un cordial saludo,<br>El equipo de UAL-Inventarium'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email password recover sent: ' + info.response);
        }
    });
}

async function registro_creado(direccion, url, nombre) {
    var mailOptions = {
        from: 'UAL Inventarium',
        to: direccion,
        subject: 'Confirmación de registro',
        html: 'Estimado ' + nombre + '<br>Para poder confirmar su registro y que sea dado de alta por un técnico tiene que acceder al siguiente enlace:  <a href="' + url + '">Pulsa aquí para darte de alta</a> <br><br>Muchas gracias por haberse registrado en UAL-Inventarium<br><br>Un cordial saludo,<br>El equipo de UAL-Inventarium'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email register create sent: ' + info.response);
        }
    });
}

async function registro_alta(direccion, nombre) {
    var mailOptions = {
        from: 'UAL Inventarium',
        to: direccion,
        subject: 'Ha sido dado de alta',
        html: 'Estimado ' + nombre + '<br>Ha sido dado de alta en UALInventarium.<br>Ahora puede acceder con total libertad al sitio web<br><br>Esperamos verle pronto<br><br>Un cordial saludo,<br>El equipo de UAL-Inventarium'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email register activated sent: ' + info.response);
        }
    });
}

async function prestamo_concedido(direccion, id, objeto, nombre) {
    var mailOptions = {
        from: 'UAL Inventarium',
        to: direccion,
        subject: 'Préstamo concedido',
        html: 'Estimado ' + nombre + '<br>Su solicitud de préstamo para el objeto ' + objeto + ' con id ' + id + ' ha sido concedido<br>Por favor, póngase en contacto con un técnico para que se lo pueda entregar.<br><br>Un cordial saludo,<br>El equipo de UAL-Inventarium'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email loan granted sent: ' + info.response);
        }
    });
}

async function prestamo_rechazado(direccion, objeto, id, nombre) {
    var mailOptions = {
        from: 'UAL Inventarium',
        to: direccion,
        subject: 'Préstamo rechazado',
        html: 'Estimado ' + nombre + '<br>Su solicitud de préstamo para el objeto ' + objeto + ' con id ' + id + ' ha sido rechazado.<br><br>Un cordial saludo,<br>El equipo de UAL-Inventarium'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email rejected loan sent: ' + info.response);
        }
    });
}

async function prestamo_expirado(direccion, objeto, id, nombre) {
    var mailOptions = {
        from: 'UAL Inventarium',
        to: direccion,
        subject: 'Préstamo expirado',
        html: 'Estimado ' + nombre + '<br>Su solicitud de préstamo para el objeto ' + objeto + ' con id ' + id + ' ha expirado.<br>Por favor, le rogamos que se ponga en contacto con un técnico para devolver el objeto.<br><br>Un cordial saludo,<br>El equipo de UAL-Inventarium'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email expired loan sent: ' + info.response);
        }
    });
}

module.exports = {
    registro_alta,
    registro_creado,
    prestamo_concedido,
    prestamo_expirado,
    prestamo_rechazado,
    recuperar_contrasena,
}

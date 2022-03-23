import nodemailer from "nodemailer";

export const emailRegister = async (data) => {
  const { email, name, token } = data;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Informacion del email
  const info = await transport.sendMail({
    from: '"UpTask - Administrator de Proyectos " <cuentas@uptask.com>',
    to: email,
    subject: "Uptask - Confirmar Cuenta",
    text: "Comprueba tu cuenta en UpTask",
    html: `<p>Bienvenido ${name} Comprueba tu cuenta en UpTask</p>
        <p>Tu cuenta ya casi esta lista, solo debes comprobarla en el siguiente enlance: </p>
            <a href="${process.env.FRONTEND_URL}/confirm/${token}">Confirmar Cuenta</a>
        <p>Si tu no creaste esta cuenta, puedes ignorar este correo</p>

        `,
  });
};

export const emailRecoverPassword = async (data) => {
  const { email, name, token } = data;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Informacion del email
  const info = await transport.sendMail({
    from: '"UpTask - Administrator de Proyectos " <cuentas@uptask.com>',
    to: email,
    subject: "Uptask - Reestablece tu password",
    text: "Reestablece tu password",
    html: `<p>${name} has solicitado reestablecer tu password</p>
        <p>Sigue el siguiente enlace para generar una nueva password: </p>
            <a href="${process.env.FRONTEND_URL}/reset-password/${token}">Reestablecer password</a>
        <p>Si tu no solicitaste reestablecer tu password, puedes ignorar este correo</p>

        `,
  });
};

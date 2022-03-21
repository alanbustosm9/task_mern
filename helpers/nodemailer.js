import nodemailer from "nodemailer";

export const emailRegister = async (data) => {
  const { email, name, token } = data;

  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "044bbbcdd37620",
      pass: "8ad0594ace379e",
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

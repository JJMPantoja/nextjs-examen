// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const userCredentials = {
  email: 'examenreact@prueba.com',
  password: '123456789',
}

export default function handler(req, res) {
  if (req.method === 'POST') {
    const body = req.body.credentials
    if (
      userCredentials.email === body['email'] &&
      userCredentials.password === body['pass']
    ) {
      const token = {
        data: '4aeee85d7878bf932223676df7e5e2b1',
      }
      return res.status(200).json(token)
    } else {
      return res
        .status(400)
        .json({ data: 'Usuario y/o contraseña incorrectos' })
    }
  } else {
    return res.status(500).json({ data: 'Metodo no soportado' })
  }
}

import "./login.scss"; 

const Login = () => {
  return (
    <div className="login_container">
        <div className="card">
            <div className="card-header">
                <h5 className="card-title text-center">Giriş</h5>
            </div>
            <div className="card-body">
                <div className="form-group">
                    <label className="form-label d-block">E-Posta</label>
                    <input type="text" className="border w-100 p-1"/>
                </div>
                <div className="form-group mt-2">
                    <label className="form-label">Şifre</label>
                    <input type="password" className="border w-100 p-1"/>
                </div>
                <button className="btn btn-sm btn-success w-100 mt-3">Giriş Yap</button>
            </div>
        </div>
    </div>
  )
}

export default Login
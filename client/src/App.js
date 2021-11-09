import axios from "axios";
import { useEffect, useState } from "react";
function App() {
  let [step, setStep] = useState(1);

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [code, setCode] = useState("");
  let [user, setUser] = useState({});

  const SERVER_URL = "http://192.168.43.185:2323";
  const onLogin = () => {
    axios
      .post(SERVER_URL + "/login", {
        email,
        password,
      })
      .then(({ data }) => {
        if (!data.error) {
          setStep(2);
        } else {
          setStep(1);
          if (data.errorCode == 0) {
            alert("Beklenmedik Bir Hata Meydana Geldi.");
          } else if (data.errorCode == 1) {
            alert("Kullanıcı Bulunamadı.");
          } else if (data.errorCode == 2) {
            alert("Doğrulama Kodu Gönderilirken Hata Oluştu.");
          }
        }
      });
  };

  const onVerify = () => {
    axios
      .post(SERVER_URL + "/verify", {
        email,
        password,
        code,
      })
      .then(({ data }) => {
        if (!data.error) {
          setStep(3);
          setUser(data.user);
        } else {
          setStep(2);
          if (data.errorCode == 0) {
            alert("Beklenmedik Bir Hata Meydana Geldi.");
          } else if (data.errorCode == 1) {
            alert("Kullanıcı Bulunamadı.");
          } else if (data.errorCode == 2) {
            alert("Doğrulama Kodu Hatalı.");
          } else if (data.errorCode == 3) {
            alert("Doğrulama Kodunuzun Süresi Dolmuş.");
          }
        }
      });
  };

  useEffect(() => {
    setStep(1);
  }, []);

  return (
    <div className="app">
      <div class="wrapper">
        <header class="main-header">
          <nav class="navbar navbar-static-top">
            <div class="container">
              <div class="navbar-header">
                <a class="navbar-brand" style={{ marginLeft: 15 }}>
                  <img
                    src="./assets/logo.png"
                    style={{ marginTop: -5, width: 30, height: 30 }}
                  />
                </a>
                <a
                  class="navbar-brand"
                  style={{ marginLeft: -15, letterSpacing: 0.7 }}
                >
                  <b>Fırat</b>
                  Üniversitesi
                </a>
                <button
                  type="button"
                  class="navbar-toggle collapsed"
                  data-toggle="collapse"
                  data-target="#navbar-collapse"
                >
                  <i class="fa fa-bars"></i>
                </button>
              </div>
              <div class="navbar-custom-menu">
                <div
                  class="collapse navbar-collapse pull-left"
                  id="navbar-collapse"
                  style={{ position: "relative", marginLeft: 10 }}
                >
                  <ul class="nav navbar-nav">
                    <li class="dropdown">
                      <a class="dropdown-toggle" data-toggle="dropdown">
                        Kısayollar <span class="caret"></span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>
        </header>

        <div class="content-wrapper" style={{ minHeight: 546 }}>
          <div class="container">
            <div class="login-box">
              <div class="login-logo">
                <a>
                  <b>Merkezi Kimlik Doğrulama Servisi</b>
                </a>
              </div>
              <div class="login-box-body">
                <div class="box fl-panel" id="login">
                  {step == 1 ? (
                    <div class="fm-v clearfix">
                      <h4>
                        <p class="login-box-msg">
                          Kullanıcı Adı ve Parolanızı giriniz
                        </p>
                      </h4>
                      <div class="form-group has-feedback">
                        <a>English</a>| <a>Türkçe</a>
                      </div>
                      <div class="form-group has-feedback">
                        <input
                          id="username"
                          name="username"
                          class="form-control"
                          tabindex="1"
                          placeholder="E Posta"
                          type="text"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div class="form-group has-feedback">
                        <input
                          id="password"
                          name="password"
                          class="form-control"
                          tabindex="2"
                          placeholder="Parola"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div class="row">
                        <input
                          class="btn btn-primary btn-block btn-danger"
                          name="submit"
                          accesskey="l"
                          value="GİRİŞ"
                          tabindex="4"
                          type="submit"
                          onClick={onLogin}
                          disabled={email == "" || password == ""}
                        />
                      </div>
                      <br />
                      <a>Şifre Değiştir</a>|<a>Şifremi Unuttum</a>
                    </div>
                  ) : step == 2 ? (
                    <div class="fm-v clearfix">
                      <div>
                        Doğrulama Kodunuz{" "}
                        <strong>
                          <em>{email}</em>
                        </strong>{" "}
                        adresine gönderildi
                      </div>
                      <input
                        class="form-control"
                        type="text"
                        placeholder="Doğrulama Kodu"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                      />
                      <div class="row">
                        <input
                          class="btn btn-primary btn-block btn-danger"
                          name="submit"
                          accesskey="l"
                          value="GİRİŞ"
                          tabindex="4"
                          type="submit"
                          onClick={onVerify}
                          disabled={code == ""}
                        />
                      </div>
                    </div>
                  ) : (
                    <div class="fm-v clearfix">
                      <div className="alert alert-success">
                        <h2>Giriş Başarılı</h2>
                        <div>Hoş Geldiniz</div>
                        <h4>
                          {user?.name} {user?.surname}
                        </h4>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer class="main-footer">
        <div class="container">
          <div class="pull-right hidden-xs">
            <b>Bilgi İşlem Daire Başkanlığı</b>
          </div>
          <strong>
            Copyright © 2016 <a>Fırat Üniversitesi</a>
          </strong>
        </div>
      </footer>
    </div>
  );
}

export default App;

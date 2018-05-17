const development = {
  mariadb: {
    host: "localhost",
    username: "onedge",
    password: "dldlfrb1@",
    database: "omija",
    port: 3306,
    dialect: "mysql",

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      freezeTableName: false,
      underscoredAll: true,
      underscored: true,
      timestamps: true,
      paranoid: true
    }
  },
  regex: {
    user: {
      userEmail: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      userName: /^[a-zA-Z가-힣]{2,16}$/,
      userPassword: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[\d])(?=.*?[\W])(?!.*\s).{8,16}$/
    }
  },
  logIn: {
    jwt: {
      jwtSecret: "O1lM2oI3gJ4iA5n",
      jwtData: {
        expiresIn: "30m",
        issuer: "omija.com"
      }
    }
  },
  confirm: {
    smtp: {
      pool: true,
      host: "localhost",
      port: 465,
      secure: true,
      service: "Gmail",
      auth: {
        user: "ex.onedge.lee@gmail.com",
        pass: "dldlfrb1@"
      }
    },
    jwt: {
      jwtSecret: "O1cM2oI3nJ4fA5irm",
      jwtData: {
        expiresIn: "30m",
        issuer: "omija.com"
      }
    }
  },
  rbac: {
    admin: {},
    creator: {},
    commonUser: {},
    bannedUser: {}
  }
};

export default development;

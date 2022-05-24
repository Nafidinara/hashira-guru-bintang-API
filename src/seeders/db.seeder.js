const seeder = require('mongoose-seed');
const config = require('../config/config');

seeder.connect(config.mongoose.url, () => {
  seeder.loadModels([
    './src/models/user.model.js',
  ]);
  seeder.clearModels(['User'], () => {
    seeder.populateModels(data, function (err, done) {
      if (err){
        return console.log(`Seed error`, err);
      }
      if (done){
        return console.log(`Seed successful`, done);
      }
      seeder.disconnect();
    });
  });
});

const data = [
  {
    'model' : 'User',
    'documents' : [
      {
        "role": "user",
        "isEmailVerified": false,
        "username": "hashira-user",
        "email": "hashirauser@example.com",
        "password" : "password123",
      },
      {
        "role": "user",
        "isEmailVerified": false,
        "username": "hashira-user-2",
        "email": "hashirauser2@example.com",
        "password" : "password123",
      },
      {
        "role": "user",
        "isEmailVerified": false,
        "username": "hashira-user-3",
        "email": "hashirauser3@example.com",
        "password" : "password123",
      },
      {
        "role": "superadmin",
        "isEmailVerified": false,
        "username": "hashira-superadmin",
        "email": "hashirasuperadmin@example.com",
        "password" : "password123",
      },
      {
        "role": "admin",
        "isEmailVerified": false,
        "username": "hashira-admin",
        "email": "hashiraadmin@example.com",
        "password" : "password123",
      }
    ]
  }
]

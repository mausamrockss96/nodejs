module.exports = function (obj1, obj2) {
       if (obj2.full_name)
              obj1.name = obj2.full_name;
       if (obj2.email_address || obj2.email)
              obj1.email = obj2.email_address || obj2.email;
       if (obj2.address)
              obj1.address = obj2.address;
       if (obj2.username)
              obj1.username = obj2.username;
       if (obj2.password)
              obj1.password = obj2.password;
       // if (obj2.gender)
              obj1.gender = obj2.gender;
       if (obj2.dob)
              obj1.dob = obj2.dob;
       if (obj2.full_country)
              obj1.country = obj2.country;
       if (obj2.status)
              obj1.status = obj2.status;
       if (obj2.address)
              obj1.address = obj2.address;
       if (obj2.phoneNumber)
              obj1.phoneNumber = obj2.phoneNumber;
       if (obj2.role)
              obj1.role = obj2.role;
       return obj1;
}




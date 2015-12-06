var getFilters = exports.getFilters = function (photo, number_of_people, gender) {

  function age(list_of_ages) {

      var sum = 0;
      var avg = 0;
      for (var i = 0; i < list_of_ages.length; i++) {
          sum = list_of_ages[i] + sum;
      }
      avg = (sum / (list_of_ages.length));
      return avg;
  }

  function tags(photo) {

  var res = {
    tags: [],
    sub_genres: [],
    no_sub_genres: [],
    genre: null
  };

      var tags = [];
      if (number_of_people == 1) {
          if(gender[0] == "m"){
          if (age(photo) < 10) {

              res.tags = ["kids","cartoon","adventures","animation","superhero"];
               res.sub_genres = ["animation","cartoon"];
               res.no_sub_genres= ["adult_animation"]

          }
          if (age(photo) >= 10 && age(photo) < 20) {

              res.tags = ["teen","comedy","romance","love","sitcom","friend","musical","high-school","teen-comedy","sport","music"];
               res.sub_genres = ["drama","pop","high-school","reality","chat shows"];

          }
          if (age(photo) >= 20 && age(photo) < 30) {

              res.tags = ["football","sport","motorsport"];
               res.sub_genres = ["news","world affairs"," showbiz","friends","friend","adult_animation"];
    

          }
          if (age(photo) >= 30 && age(photo) < 40) {

              res.tags = ["football","sport","motorsport","culture","documentary"];
               res.sub_genres = ["family","people","news","culture","technology","adult_animation"];


          }
          if (age(photo) >= 40) {

              res.tags = ["football","sport","motorsport","culture","documentary","debate","politics"];
              res.sub_genres = ["family","people","news","culture","technology","reality","world affairs"];

          }
        } else if (gender[0] == "f"){

          if (age(photo) < 10) {

              res.tags = ["kids","cartoon","adventures","animation","princess","pony","bears","animals"];
               res.sub_genres = ["animation","cartoon"];

          }
          if (age(photo) >= 10 && age(photo) < 20) {

              res.tags = ["teen","comedy","romance","love","sitcom","friend","musical","high-school","teen-comedy","music"];
               res.sub_genres = ["drama","pop","high-school","reality","chat shows","social","people"];

          }
          if (age(photo) >= 20 && age(photo) < 30) {

              res.tags = ["friends","love","make up","girls","marriage","night","disco"];
               res.sub_genres = ["news","showbiz","friends","friend","disco","party"];
    

          }
          if (age(photo) >= 30 && age(photo) < 40) {

              res.tags = ["cooking","sport","cake","mother","care","marriage","friends","night-out","dress"];
               res.sub_genres = ["family","people","husband","culture","news"];


          }
          if (age(photo) >= 40) {

              res.tags = ["dress","sport","motorsport","culture","documentary","debate","cooking","afternoon","morning"];
              res.sub_genres = ["family","people","kitchen","culture","reality","world affairs"];

          }

        }
      } else if (number_of_people == 2) {
          if(gender[0] == "m" && gender[1] == "f"){
          if (age(photo) < 10) {

                 res.tags = ["kids","cartoon","adventures","animation","pony","bears","animals"];
               res.sub_genres = ["animation","cartoon"];

          }
          if (age(photo) >= 10 && age(photo) < 20) {

              res.tags = ["teen","comedy","romance","love","sitcom","friend","musical","high-school","teen-comedy","music"];
               res.sub_genres = ["drama","pop","high-school","reality","chat shows","social","people"];

          }
          if (age(photo) >= 20 && age(photo) < 30) {
              res.tags = ["teen","comedy","romance","love","sitcom","friend","musical","high-school","teen-comedy","music"];
               res.sub_genres = ["drama","pop","high-school","reality","chat shows","social","people"];
              
          }
          if (age(photo) >= 30 && age(photo) < 40) {

                res.tags = ["teen","comedy","romance","love","sitcom","friend","musical","family","people","cooking"];
               res.sub_genres = ["drama","pop","reality","chat shows","social","people"];

          }
          if (age(photo) >= 40) {

              res.tags = ["documentary","comedy","romance","love","family","friend","debate","news","history","love"];
               res.sub_genres = ["drama","documentary","high-school","reality","chat shows","movie","people","sitcom"];  

          }
        } else if(gender[0] == "m" && gender[1] == "m"){

          // 2 MEN
          if (age(photo) < 10) {

             res.tags = ["kids","cartoon","adventures","animation","superhero"];
               res.sub_genres = ["animation","cartoon"];


          }
          if (age(photo) >= 10 && age(photo) < 20) {

               res.tags = ["play","comedy","football","night","sitcom","friend","musical","high-school","teen-comedy","sport","basketball","tennis"];
               res.sub_genres = ["drama","pop","high-school","reality","chat shows","sport","show"];

          }
          if (age(photo) >= 20 && age(photo) < 30) {

               res.tags = ["football","sport","motorsport"];
               res.sub_genres = ["news","world affairs"," showbiz","friends","friend","adult_animation"];
          }
          if (age(photo) >= 30 && age(photo) < 40) {

              es.tags = ["football","sport","motorsport","culture","documentary","animation"];
               res.sub_genres = ["family","people","news","culture","technology","adult_animation"];

          }
          if (age(photo) >= 40) {

              
              res.tags = ["football","sport","motorsport","culture","documentary","debate","politics"];
              res.sub_genres = ["family","people","news","culture","technology","reality","world affairs"];

          }

        } else if(gender[0] == "f" && gender[1] == "f"){

          //MEN AND WOMEN
          if (age(photo) < 10) {

             res.tags = ["kids","cartoon","adventures","animation","princess","pony","bears","animals"];
               res.sub_genres = ["animation","cartoon"];

          }
          if (age(photo) >= 10 && age(photo) < 20) {

               res.tags = ["teen","comedy","romance","love","sitcom","friend","musical","high-school","teen-comedy","music"];
               res.sub_genres = ["drama","pop","high-school","reality","chat shows","social","people"];

          }
          if (age(photo) >= 20 && age(photo) < 30) {

                res.tags = ["friends","love","make up","girls","marriage","night","disco"];
               res.sub_genres = ["news","showbiz","friends","friend","disco","party"];
          }
          if (age(photo) >= 30 && age(photo) < 40) {

              

                res.tags = ["teen","comedy","romance","love","sitcom","friend","musical","family","people","cooking"];
               res.sub_genres = ["drama","pop","high-school","reality","chat shows","social","people"];

          }
          if (age(photo) >= 40) {

               res.tags = ["documentary","comedy","romance","love","family","friend","debate","news","history","love"];
               res.sub_genres = ["drama","documentary","high-school","reality","chat shows","movie","people","sitcom"];  

          }

        }


      } else if (number_of_people > 2) {

          if (age(photo) < 10) {

              res.tags = ["kids","cartoon","adventures","animation","animation","animals"];
               res.sub_genres = ["animation","cartoon","show"];

          }
          if (age(photo) >= 10 && age(photo) < 20) {

              
              res.tags = ["friends","love","actor","movie","star","enjoy","laugh","action","enjoy","people"];
               res.sub_genres = ["news","showbiz","friends","friend","disco","party"];
    
          }
          if (age(photo) >= 20 && age(photo) < 30) {

              res.tags = ["friends","love","actor","movie","star","enjoy","laugh","action","enjoy","people"];
               res.sub_genres = ["news","showbiz","friends","friend","disco","party"];
              

          }
          if (age(photo) >= 30 && age(photo) < 40) {

              res.tags = ["friends","love","actor","movie","star","enjoy","laugh","action","enjoy","people","sport"];
               res.sub_genres = ["news","showbiz","friends","friend","disco","party","late night"];
          }
          if (age(photo) >= 40) {

              res.tags = ["friends","debate","history","movie","news","enjoy","laugh","documentary","together","people","sport"];
               res.sub_genres = ["news","showbiz","friends","friend","party","evening"];
             

          }
      }
      return res;
  }
  
  return tags(photo);
}

module.exports = exports;


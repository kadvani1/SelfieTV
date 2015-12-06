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
               res.sub_genres = ["news","world affairs"," showbiz","friends","friend"];
    

          }
          if (age(photo) >= 30 && age(photo) < 40) {

              res.tags = ["football","sport","motorsport","culture","documentary"];
               res.sub_genres = ["family","people","news","culture","technology"];


          }
          if (age(photo) >= 40) {

              res.tags = ["football","sport","motorsport","culture","documentary"];
              res.sub_genres = ["family","people","news","culture","technology","reality","world affairs"];

          }
        } else if (gender[0] == "f"){


        }
      } else if (number_of_people == 2) {
          if(gender[0] == "m" && gender[1] == "f"){
          if (age(photo) < 10) {

             

          }
          if (age(photo) >= 10 && age(photo) < 20) {

              

          }
          if (age(photo) >= 20 && age(photo) < 30) {

              
          }
          if (age(photo) >= 30 && age(photo) < 40) {

              

          }
          if (age(photo) >= 40) {

              

          }
        } else if(gender[0] == "m" && gender[1] == "m"){

          // 2 MEN
          if (age(photo) < 10) {

             

          }
          if (age(photo) >= 10 && age(photo) < 20) {

              

          }
          if (age(photo) >= 20 && age(photo) < 30) {

              
          }
          if (age(photo) >= 30 && age(photo) < 40) {

              

          }
          if (age(photo) >= 40) {

              

          }

        } else if(gender[0] == "f" && gender[1] == "f"){

          //MEN AND WOMEN
          if (age(photo) < 10) {

             

          }
          if (age(photo) >= 10 && age(photo) < 20) {

              

          }
          if (age(photo) >= 20 && age(photo) < 30) {

              
          }
          if (age(photo) >= 30 && age(photo) < 40) {

              

          }
          if (age(photo) >= 40) {

              

          }

        }


      } else if (number_of_people > 2) {

          if (age(photo) < 10) {

              

          }
          if (age(photo) >= 10 && age(photo) < 20) {

              

          }
          if (age(photo) >= 20 && age(photo) < 30) {

              

          }
          if (age(photo) >= 30 && age(photo) < 40) {

              

          }
          if (age(photo) >= 40) {

             

          }
      }
      return res;
  }
  
  return tags(photo);
}

module.exports = exports;


var getFilters = exports.getFilters = function (number_of_people, photo, gender) {

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

      var tags = [];
      if (number_of_people == 1) {

          if (age(photo) < 10) {

              tags = ["kids", "cartoon", "adventures", "animation", "superhero"];
              return tags;

          }
          if (age(photo) >= 10 && age(photo) < 20) {

              tags = ["teen", "comedy", "romance", "love", "sitcom", "friend", "musical", "high-school", "teen-comedy", "sport", "music"];
              return tags;

          }
          if (age(photo) >= 20 && age(photo) < 30) {

              tags = ["football", "sport", "motorsport"];
              return tags;

          }
          if (age(photo) >= 30 && age(photo) < 40) {

              tags = ["football", "sport", "motorsport", "culture", "documentary"];
              return tags;

          }
          if (age(photo) >= 40) {

              tags = ["football", "sport", "motorsport", "culture", "documentary"];
              return tags;

          }
      } else if (number_of_people == 2) {

          if (age(photo) < 10) {

              tags = ["kids", "cartoon", "adventures", "animation", "superhero"];
              return tags;

          }
          if (age(photo) >= 10 && age(photo) < 20) {

              tags = ["teen", "comedy", "romance", "love", "sitcom", "friend", "musical", "high-school", "teen-comedy", "sport", "music"];
              return tags;

          }
          if (age(photo) >= 20 && age(photo) < 30) {

              tags = ["football", "sport", "motorsport"];
              return tags;

          }
          if (age(photo) >= 30 && age(photo) < 40) {

              tags = ["football", "sport", "motorsport", "culture", "documentary"];
              return tags;

          }
          if (age(photo) >= 40) {

              tags = ["football", "sport", "motorsport", "culture", "documentary"];
              return tags;

          }


      } else if (number_of_people > 2) {

          if (age(photo) < 10) {

              tags = ["kids", "cartoon", "adventures", "animation", "superhero"];
              return tags;

          }
          if (age(photo) >= 10 && age(photo) < 20) {

              tags = ["teen", "comedy", "romance", "love", "sitcom", "friend", "musical", "high-school", "teen-comedy", "sport", "music"];
              return tags;

          }
          if (age(photo) >= 20 && age(photo) < 30) {

              tags = ["football", "sport", "motorsport"];
              return tags;

          }
          if (age(photo) >= 30 && age(photo) < 40) {

              tags = ["football", "sport", "motorsport", "culture", "documentary"];
              return tags;

          }
          if (age(photo) >= 40) {

              tags = ["football", "sport", "motorsport", "culture", "documentary"];
              return tags;

          }
      }
  }
  return tags(photo);
}

module.exports = exports;


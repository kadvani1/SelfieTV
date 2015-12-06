function changePhoto(fname) {
    $("#frame img").attr("src", fname)
}

    function updateVideo(people) {
        if (people.length && people[0].gender == 'female'&&people[0].age<50)  {
            changePhoto('victoria.png')
        }
        else if (people.length && people[0].gender=='male') {
            changePhoto('zara.png')
        }
         else if (people.length && people[0].age>50) {
            changePhoto('ms.png')
        }

    }

    
function changePhoto(fname) {
    $("#frame img").attr("src", fname)
}

    function updateVideo(people) {
        if (people.length && people[0].gender == 'female')  {
            changePhoto('female.png')
        }
        else if (people.length && people[0].gender=='male') {
            changePhoto('men.png')
        }
        

    }

    
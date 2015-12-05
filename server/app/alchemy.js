var formidable = require('formidable');
var util = require('util');
var fs = require('fs-extra');
var qt = require('quickthumb');
var watson = require('watson-developer-cloud');

var alchemy_vision = watson.alchemy_vision({
    api_key: 'a0a30e8d36dfb222bd961482d0fc42282582c776'
});
// Use quickthumb
app.use(qt.static(__dirname + '/'));

function(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {});

    form.on('end', function(fields, files) {
        /* Temporary location of our uploaded file */
        var temp_path = this.openedFiles[0].path;
        /* The file name of the uploaded file */
        var file_name = 'test.jpg';
        /* Location where we want to copy the uploaded file */
        var new_location = 'uploads/';

        fs.copy(temp_path, new_location + file_name, function(err) {
            if (err) {
                console.error(err);
            } else {
                console.log(new_location + file_name)
                var params = {
                    image: fs.createReadStream('/Users/phani/new_work/selfie-tv/' + new_location + file_name)
                };

                alchemy_vision.recognizeFaces(params, function(err, keywords) {
                    if (err)
                        console.log('error:', err);
                    else {
                        console.log(JSON.stringify(keywords, null, 2));
                        res.json(keywords)
                    }

                });
            }
        });
    });
}


// app.post('/upload', );


// app.get('/getFaces', function(req, res) {
//     res.writeHead(200, {
//         'Content-Type': 'text/html'
//     });
//     var form = '<form action="/upload" enctype="multipart/form-data" method="post">Add a title: <input name="title" type="text" /><br><br><input multiple="multiple" name="upload" type="file" /><br><br><input type="submit" value="Upload" /></form>';
//     res.end(form);
// });

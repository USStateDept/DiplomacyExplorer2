/*
#load page with different widths and check that something is visible
#check that the logo is visilble
#load page and click something that should have a certain zero value
#check that all of the external sources are loading
#Check that colors are corresponding
#check that values change with the time slider
#check that when the hash is chnaged when loaded it shows certain layers
*/





// googletesting.js
casper.test.begin('Check the front page', 4, function suite(test) {
    casper.start("http://localhost:8000/discoverdiplomacy/explorer/issues/", function() {

        casper.waitFor(function check() {
            return this.visible('#viewTour');
        }, function then() {
            this.echo('.selector is no more!');
            test.assertTitle("Diplomacy Explorer 2", "Diplomacy Explorer 2 title is set");
            test.assertExists('svg', "The SVG is drawn");
            this.click('#lives');
        });


    });


    casper.then(function() {
        test.assertVisible('.lives', "lives is up");
        this.click('.lives');

    });


    casper.then(function() {
        test.assertVisible('#MaternalHealthAccessToCare_2014_Keyid');
    });

    casper.run(function() {
        test.done();
    });
});
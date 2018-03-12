USE facebook_poster;

 INSERT INTO event
 (ClientId, title, date, start, end, description, location, public, posted)
 VALUES
(1,"The Mars Show", 2018-03-07 14:10:19, 2018-03-07 14:10:19, 2018-03-07 14:10:19, "Blah blah blah", "The Ogden Theatre", true, false),
(1,"The Mercury Show", 2018-04-16, 8:00, 9:00, "Blah blah blah", "The Nash Theatre", true, false),
(2,"The Venus Show", 2018-04-17, 8:30, 10:00, "Blah blah blah", "The Oriental Theatre", true, false),
(2,"The Earth Show", 2018-04-18, 8:00, 10:00, "Blah blah blah", "The Ogden Theatre", true, false)
(2,"The Jupiter Show", 2018-04-19, 7:30, 9:00, "Blah blah blah", "The Oriental Theatre", true, false),
(3,"The Saturn Show", 2018-04-20, 7:00,  9:00, "Blah blah blah", "The Nash Theatre", true, false),
(3,"The Neptune Show", 2018-04-21,  8:30, 10:00, "Blah blah blah", "The Oriental Theatre", true, false),
(3,"The Uranus Show", 2018-04-22, 7:30,  9:00, "Blah blah blah", "The Ogden Theatre", true, false);

 INSERT INTO client
 (name, pageId, email, password)
 VALUES
("Elliot Reed", '203801840389513',"elliot@elliotreed.net","elliot"),
("Elishibani Omar", '0000000000000000',"amr.omar80@gmail.com","elishibani"),
("Lydia Young", '2050872278494074',"lydiaryoung@gmail.com","lydia");

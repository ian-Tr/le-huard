DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS member;
DROP TABLE IF EXISTS media;

CREATE TABLE media (
	id				INT					NOT NULL	AUTO_INCREMENT,
	url				VARCHAR(100)		NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE member (
	id				INT					NOT NULL	AUTO_INCREMENT,
	role				VARCHAR(6)			NOT NULL,
	username		VARCHAR(20)			NOT NULL,
	password		VARCHAR(30)			NOT NULL,
	email			VARCHAR(50)			NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE post (
	id				INT					NOT NULL	AUTO_INCREMENT,
	mem_id		INT					NOT NULL,
	media_id		INT				NOT NULL,
	medium			VARCHAR(50)		NOT NULL,
	medium_type		VARCHAR(50) NOT NULL,
	medium_spec		VARCHAR(50),
	title			VARCHAR(50)			NOT NULL,
	media_date		DATE				NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (mem_id) REFERENCES member(id) ON DELETE CASCADE,
	FOREIGN KEY (media_id) REFERENCES media(id) ON DELETE CASCADE
);

CREATE TABLE comments (
	id				INT					NOT NULL	AUTO_INCREMENT,
	post_id			INT					NOT NULL,
	mem_id			INT					NOT NULL,
	content			VARCHAR(150)		NOT NULL,
	comment_date	DATE				NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (post_id) REFERENCES post(id) ON DELETE CASCADE,
	FOREIGN KEY (mem_id) REFERENCES member(id) ON DELETE CASCADE
);

INSERT INTO media (url) VALUES ('/src/client/photos/35mm-Couleur/American-Backpacker-Vancouver-2012');
INSERT INTO media (url) VALUES ('/src/client/photos/35mm-Couleur/Carousel-NA-NA');
INSERT INTO media (url) VALUES ('/src/client/photos/35mm-Couleur/Cherries-OliverBC-2012');
INSERT INTO media (url) VALUES ('/src/client/photos/35mm-Couleur/Cooking-in-a-Pot-OliverBC-2012');
INSERT INTO media (url) VALUES ('/src/client/photos/35mm-Couleur/Dodo-MontereyCA-2013');
INSERT INTO media (url) VALUES ('/src/client/photos/35mm-Couleur/Friends-NA-NA');
INSERT INTO media (url) VALUES ('/src/client/photos/35mm-Couleur/Hot-Springs-BC-2012');
INSERT INTO media (url) VALUES ('/src/client/photos/35mm-Couleur/In-the-bus-SanFrancisco-2013');
INSERT INTO media (url) VALUES ('/src/client/photos/35mm-Couleur/Mushroom-Beach-KelownaBC-2013');
INSERT INTO media (url) VALUES ('/src/client/photos/35mm-Couleur/Rainbows-n-Weed-KelownaBC-2013');
INSERT INTO media (url) VALUES ('/src/client/photos/35mm-Couleur/Rollin-BC-2012');
INSERT INTO media (url) VALUES ('/src/client/photos/35mm-Couleur/Smokin-High-In-Cali-MontereyCalifornia');
INSERT INTO media (url) VALUES ('/src/client/photos/35mm-Couleur/Sunset-Beach-SanFrancisco-2013');
INSERT INTO media (url) VALUES ('/src/client/photos/35mm-Couleur/Woods-BC-2012');
INSERT INTO media (url) VALUES ('/src/client/photos/35mm-Couleur/WWOOFing-BC-2012');
INSERT INTO media (url) VALUES ('/src/client/photos/120mm-BW/Auditions-Montreal-2015');
INSERT INTO media (url) VALUES ('/src/client/photos/120mm-BW/Backyard-BrooklynNY-Montreal');
INSERT INTO media (url) VALUES ('/src/client/photos/120mm-BW/Breakup-RiveSudQC-2014');
INSERT INTO media (url) VALUES ('/src/client/photos/120mm-BW/Cabaret-Chaos1-Montreal-2014');
INSERT INTO media (url) VALUES ('/src/client/photos/120mm-BW/Cabaret-Chaos2-Montreal-2014');
INSERT INTO media (url) VALUES ('/src/client/photos/120mm-BW/Church-Montreal-2015');
INSERT INTO media (url) VALUES ('/src/client/photos/120mm-BW/La-Cours-Encore-Montreal-2015');
INSERT INTO media (url) VALUES ('/src/client/photos/120mm-BW/La-Cours-Montreal-2015');
INSERT INTO media (url) VALUES ('/src/client/photos/120mm-BW/Ma-Soeur-Montreal-2015');
INSERT INTO media (url) VALUES ('/src/client/photos/120mm-BW/Mort-et-Amour-Montreal-2015');
INSERT INTO media (url) VALUES ('/src/client/photos/120mm-BW/Octobre-en-Kimono-Montreal-2015');
INSERT INTO media (url) VALUES ('/src/client/photos/120mm-BW/Post-RiveSudQC-2014');
INSERT INTO media (url) VALUES ('/src/client/photos/120mm-BW/Probablement-La-Genese-Montreal-2015');
INSERT INTO media (url) VALUES ('/src/client/photos/120mm-BW/Sans-Titre-2014');
INSERT INTO media (url) VALUES ('/src/client/photos/120mm-BW/Sous-Sol-Montreal-2014');
INSERT INTO media (url) VALUES ('/src/client/photos/120mm-Couleur/A-la-Plage-NewyorkNY-2015');
INSERT INTO media (url) VALUES ('/src/client/photos/120mm-Couleur/Au-Chalet-QC-2015');
INSERT INTO media (url) VALUES ('/src/client/photos/120mm-Couleur/Ben-Working-Newyork-2015');
INSERT INTO media (url) VALUES ('/src/client/photos/120mm-Couleur/Berri-Montreal-2014');
INSERT INTO media (url) VALUES ('/src/client/photos/120mm-Couleur/Confort-Metro-Montreal-2014');
INSERT INTO media (url) VALUES ('/src/client/photos/120mm-Couleur/Habitat-67-Montreal-2014');
INSERT INTO media (url) VALUES ('/src/client/photos/120mm-Couleur/Metro-Montreal-2014');
INSERT INTO media (url) VALUES ('/src/client/photos/120mm-Couleur/Sans-Titre-NewYorkNY-2015');
INSERT INTO media (url) VALUES ('/src/client/photos/120mm-Couleur/Sans-Titre-QC-2015');
INSERT INTO media (url) VALUES ('/src/client/photos/120mm-Couleur/Tournage-en-Campagne-QC-2015');
INSERT INTO media (url) VALUES ('/src/client/photos/Disposable-BW/Disposable-BW-1');
INSERT INTO media (url) VALUES ('/src/client/photos/Disposable-BW/Disposable-BW-2');
INSERT INTO media (url) VALUES ('/src/client/photos/Disposable-BW/Disposable-BW-3');
INSERT INTO media (url) VALUES ('/src/client/photos/Disposable-BW/Disposable-BW-4');
INSERT INTO media (url) VALUES ('/src/client/photos/Disposable-BW/Disposable-BW-5');
INSERT INTO media (url) VALUES ('/src/client/photos/Disposable-BW/Disposable-BW-6');
INSERT INTO media (url) VALUES ('/src/client/photos/Disposable-BW/Disposable-BW-7');
INSERT INTO media (url) VALUES ('/src/client/photos/Disposable-BW/Disposable-BW-8');
INSERT INTO media (url) VALUES ('/src/client/photos/Disposable-BW/Disposable-BW-9');
INSERT INTO media (url) VALUES ('/src/client/photos/Disposable-BW/Disposable-BW-10');
INSERT INTO media (url) VALUES ('/src/client/photos/Disposable-BW/Disposable-BW-11');
INSERT INTO media (url) VALUES ('/src/client/photos/Disposable-BW/Disposable-BW-12');
INSERT INTO media (url) VALUES ('/src/client/photos/Disposable-BW/Disposable-BW-13');
INSERT INTO media (url) VALUES ('/src/client/photos/Disposable-BW/Disposable-BW-14');
INSERT INTO media (url) VALUES ('/src/client/photos/Disposable-Couleur/Disposable-Couleur-1');
INSERT INTO media (url) VALUES ('/src/client/photos/Disposable-Couleur/Disposable-Couleur-2');
INSERT INTO media (url) VALUES ('/src/client/photos/Disposable-Couleur/Disposable-Couleur-3');
INSERT INTO media (url) VALUES ('/src/client/photos/Disposable-Couleur/Disposable-Couleur-4');
INSERT INTO media (url) VALUES ('/src/client/photos/Disposable-Couleur/Disposable-Couleur-5');
INSERT INTO media (url) VALUES ('/src/client/photos/Disposable-Couleur/Disposable-Couleur-6');

INSERT INTO member (role, username, password, email) VALUES ('admin', 'admin', 'admin', 'admin@admin.com');
INSERT INTO member (role, username, password, email) VALUES ('member', 'member', 'member', 'member@member.com');

INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 1, 'photo', '35mm', 'Couleur', 'American Backpacker', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 2, 'photo', '35mm', 'Couleur', 'Carousel', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 3, 'photo', '35mm', 'Couleur', 'Cherries', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 4, 'photo', '35mm', 'Couleur', 'Cooking in a Pot', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 5, 'photo', '35mm', 'Couleur', 'Dodo', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 6, 'photo', '35mm', 'Couleur', 'Friends', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 7, 'photo', '35mm', 'Couleur', 'Hot Springs', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 8, 'photo', '35mm', 'Couleur', 'In the Bus', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 9, 'photo', '35mm', 'Couleur', 'Mushroom Beach', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 10, 'photo', '35mm', 'Couleur', 'Rainbows & Weed', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 11, 'photo', '35mm', 'Couleur', 'Rollin', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 12, 'photo', '35mm', 'Couleur', 'Smokin High', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 13, 'photo', '35mm', 'Couleur', 'Sunset Beach', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 14, 'photo', '35mm', 'Couleur', 'Woods', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 15, 'photo', '35mm', 'Couleur', 'WWOOFing', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 16, 'photo', '120mm', 'B&W', 'Auditions', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 17, 'photo', '120mm', 'B&W', 'Backyard', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 18, 'photo', '120mm', 'B&W', 'Breakup', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 19, 'photo', '120mm', 'B&W', 'Cabaret Chaos 1', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 20, 'photo', '120mm', 'B&W', 'Cabaret Chaos 2', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 21, 'photo', '120mm', 'B&W', 'Church', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 22, 'photo', '120mm', 'B&W', 'La Cours Encore', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 23, 'photo', '120mm', 'B&W', 'La Cours', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 24, 'photo', '120mm', 'B&W', 'Ma Soeur', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 25, 'photo', '120mm', 'B&W', 'Mort et Amour', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 26, 'photo', '120mm', 'B&W', 'Octobre en Kimono', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 27, 'photo', '120mm', 'B&W', 'Post', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 28, 'photo', '120mm', 'B&W', 'Probablement la Genese', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 29, 'photo', '120mm', 'B&W', 'Sans Titre', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 30, 'photo', '120mm', 'B&W', 'Sous Sol', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 31, 'photo', '120mm', 'Couleur', 'A la Plage', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 32, 'photo', '120mm', 'Couleur', 'Au Chalet', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 33, 'photo', '120mm', 'Couleur', 'Ben Working', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 34, 'photo', '120mm', 'Couleur', 'Berri', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 35, 'photo', '120mm', 'Couleur', 'Confort', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 36, 'photo', '120mm', 'Couleur', 'Habitat 67', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 37, 'photo', '120mm', 'Couleur', 'Metro', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 38, 'photo', '120mm', 'Couleur', 'Window Girl', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 39, 'photo', '120mm', 'Couleur', 'Reflection', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 40, 'photo', '120mm', 'Couleur', 'Tournage en Compagne', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 41, 'photo', 'Disposable', 'B&W', 'Disposable-B&W-1', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 42, 'photo', 'Disposable', 'B&W', 'Disposable-B&W-4', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 43, 'photo', 'Disposable', 'B&W', 'Disposable-B&W-2', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 44, 'photo', 'Disposable', 'B&W', 'Disposable-B&W-3', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 45, 'photo', 'Disposable', 'B&W', 'Disposable-B&W-5', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 46, 'photo', 'Disposable', 'B&W', 'Disposable-B&W-6', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 47, 'photo', 'Disposable', 'B&W', 'Disposable-B&W-7', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 48, 'photo', 'Disposable', 'B&W', 'Disposable-B&W-8', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 49, 'photo', 'Disposable', 'B&W', 'Disposable-B&W-9', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 50, 'photo', 'Disposable', 'B&W', 'Disposable-B&W-10', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 51, 'photo', 'Disposable', 'B&W', 'Disposable-B&W-11', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 52, 'photo', 'Disposable', 'B&W', 'Disposable-B&W-12', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 53, 'photo', 'Disposable', 'B&W', 'Disposable-B&W-13', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 54, 'photo', 'Disposable', 'B&W', 'Disposable-B&W-14', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 55, 'photo', 'Disposable', 'Couleur', 'Disposable-Couleur-1', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 56, 'photo', 'Disposable', 'Couleur', 'Disposable-Couleur-2', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 57, 'photo', 'Disposable', 'Couleur', 'Disposable-Couleur-3', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 58, 'photo', 'Disposable', 'Couleur', 'Disposable-Couleur-4', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 59, 'photo', 'Disposable', 'Couleur', 'Disposable-Couleur-5', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 60, 'photo', 'Disposable', 'Couleur', 'Disposable-Couleur-6', '2016-01-16');

INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (1, 1, 'First admin comment', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (1, 1, 'Second member comment', '2016-01-16');

delimiter //

CREATE PROCEDURE getMedia()
BEGIN
	SELECT * FROM media;
END//

CREATE PROCEDURE getMember()
BEGIN
	SELECT * FROM member;
END//

CREATE PROCEDURE getPost()
BEGIN
	SELECT * FROM post;
END//

CREATE PROCEDURE getComments()
BEGIN
	SELECT * FROM comments;
END//

CREATE PROCEDURE getPostMedia()
BEGIN
	select post.id, media.id, post.medium, post.medium_type, post.medium_spec, post.title, post.media_date, media.url
	from post, media
	where post.media_id = media.id
END//

CREATE PROCEDURE setMedia(IN url_in VARCHAR(100))
BEGIN
	INSERT INTO media (url) VALUES (url_in);
END//

CREATE PROCEDURE setMember(IN username_in VARCHAR(20),
                           IN password_in VARCHAR(30),
                           IN email_in VARCHAR(50))
BEGIN
	INSERT INTO member (username, password, email)
	VALUES (username_in, password_in, email_in);
END//

CREATE PROCEDURE setPost(IN mem_id_in INT,
						 IN media_id_in INT,
						 IN medium_in VARCHAR(50),
						 IN medium_type_in VARCHAR(50),
						 IN medium_spec_in VARCHAR(50),
						 IN title_in VARCHAR(50),
						 IN media_date_in DATE)
BEGIN
	INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date)
	VALUES (mem_id_in, media_id_in, medium_in, medium_type_in, medium_spec_in, title_in, media_date_in);
END//

CREATE PROCEDURE setComment(IN post_id_in INT,
							IN mem_id_in INT,
							IN content_in VARCHAR(150),
							IN comment_date_in DATE)
BEGIN
 	INSERT INTO comments (post_id, mem_id, content, comment_date)
	VALUES (post_id_in, mem_id_in, content_in, comment_date_in);
END//


CREATE PROCEDURE updateMemberUsername(IN id_in INT,
                                      IN username_in VARCHAR(20))
BEGIN
	UPDATE member
    SET username = username_in
    WHERE id = id_in;
END//

CREATE PROCEDURE updateMemberPassword(IN id_in INT,
                                      IN password_in VARCHAR(30))
BEGIN
	UPDATE member
    SET password = password_in
    WHERE id = id_in;
END//

CREATE PROCEDURE updateMemberEmail(IN id_in INT,
								   IN email_in VARCHAR(50))
BEGIN
	UPDATE member
    SET email = email_in
    WHERE id = id_in;
END//

CREATE PROCEDURE updatePostMedium(IN id_in INT,
                                  IN medium_in VARCHAR(50))
BEGIN
	UPDATE post
    SET medium = medium_in
    WHERE id = id_in;
END//

CREATE PROCEDURE updatePostMediumType(IN id_in INT,
                                  	  IN medium_type_in VARCHAR(50))
BEGIN
	UPDATE post
    SET medium_type = medium_type_in
    WHERE id = id_in;
END//

CREATE PROCEDURE updatePostMediumSpec(IN id_in INT,
                                      IN medium_spec_in VARCHAR(50))
BEGIN
	UPDATE post
    SET medium_spec = medium_spec_in
    WHERE id = id_in;
END//

CREATE PROCEDURE updatePostTitle(IN id_in INT,
                                 IN medium_spec_in VARCHAR(50))
BEGIN
	UPDATE post
    SET medium_spec = medium_spec_in
    WHERE id = id_in;
END//

CREATE PROCEDURE updatePostMediaDate(IN id_in INT,
                                 	 IN media_date_in VARCHAR(50))
BEGIN
	UPDATE post
    SET media_date = media_date_in
    WHERE id = id_in;
END//

CREATE PROCEDURE deletePost(In id_in INT)
BEGIN
	DECLARE media_id INT DEFAULT 0;
	SELECT media_id INTO media_id
		FROM post
		WHERE id = id_in;
	DELETE FROM media
	WHERE id = media_id;
	DELETE FROM post
	WHERE id = id_in;
END//

CREATE PROCEDURE deleteMember(In id_in INT)
BEGIN
	DELETE FROM member
	WHERE id = id_in;
END//

CREATE PROCEDURE deleteComment(In id_in INT)
BEGIN
	DELETE FROM comment
	WHERE id = id_in;
END//

delimiter ;

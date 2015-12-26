CREATE TABLE media (
	id				INT					NOT NULL	AUTO_INCREMENT,
	url				VARCHAR(100)		NOT NULL,	
	PRIMARY KEY (id)
);

CREATE TABLE member (
	id				INT					NOT NULL	AUTO_INCREMENT,
	username		VARCHAR(20)			NOT NULL,
	password		VARCHAR(30)			NOT NULL,
	email			VARCHAR(50)			NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE admin (
	id				INT					NOT NULL	AUTO_INCREMENT,
	mem_id			INT					NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (mem_id) REFERENCES member(id) ON DELETE CASCADE
);

CREATE TABLE post (
	id				INT					NOT NULL	AUTO_INCREMENT,
	admin_id		INT					NOT NULL,	
	media_id		INT,
	medium			VARCHAR(50),
	medium_type		VARCHAR(50),
	medium_spec		VARCHAR(50),
	title			VARCHAR(50)			NOT NULL,
	media_date		DATE				NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (admin_id) REFERENCES administrator(id) ON DELETE CASCADE,	
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



INSERT INTO media (url) VALUES ('videos/video1.mp4');
INSERT INTO media (url) VALUES ('videos/video2.mp4');
INSERT INTO media (url) VALUES ('videos/video3.mp4');
INSERT INTO media (url) VALUES ('videos/video4.mp4');
INSERT INTO media (url) VALUES ('videos/photo1.jpg');
INSERT INTO media (url) VALUES ('videos/photo2.jpg');
INSERT INTO media (url) VALUES ('videos/photo3.jpg');
INSERT INTO media (url) VALUES ('videos/photo4.jpg');
INSERT INTO media (url) VALUES ('videos/photo5.jpg');
INSERT INTO media (url) VALUES ('videos/photo6.jpg');
INSERT INTO media (url) VALUES ('videos/photo7.jpg');
INSERT INTO media (url) VALUES ('videos/photo8.jpg');
INSERT INTO media (url) VALUES ('videos/photo9.jpg');
INSERT INTO media (url) VALUES ('videos/photo10.jpg');
INSERT INTO media (url) VALUES ('videos/photo11.jpg');
INSERT INTO media (url) VALUES ('videos/photo12.jpg');
INSERT INTO media (url) VALUES ('videos/photo13.jpg');
INSERT INTO media (url) VALUES ('videos/photo14.jpg');
INSERT INTO media (url) VALUES ('videos/photo15.jpg');
INSERT INTO media (url) VALUES ('videos/photo16.jpg');
INSERT INTO media (url) VALUES ('videos/photo17.jpg');
INSERT INTO media (url) VALUES ('videos/photo18.jpg');
INSERT INTO media (url) VALUES ('videos/photo19.jpg');
INSERT INTO media (url) VALUES ('videos/photo20.jpg');

INSERT INTO member (username, password, email) VALUES ('admin', 'admin', 'eloi.qs@outlook.com');
INSERT INTO member (username, password, email) VALUES ('bobbyflay123', 'chefMaster321', 'bobflay@ironchefamerica.com');
INSERT INTO member (username, password, email) VALUES ('bObama', 'mrpres98876', 'barackobama@whitehouse.gov');
INSERT INTO member (username, password, email) VALUES ('einsteiner', 'ilovephysics', 'genius@hotmail.ca');
INSERT INTO member (username, password, email) VALUES ('pedroCabrejo', 'superduper420', 'pedrocompsci@champlain.edu');
INSERT INTO member (username, password, email) VALUES ('gnasher', 'hots4lyfe', 'rchaurand@outlook.com');

INSERT INTO admin (mem_id) VALUES (1);

INSERT INTO post (admin_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 1, 'video', NULL, NULL, 'Video Title', '2015-11-05');
INSERT INTO post (admin_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 2, 'video', NULL, NULL, 'Video Title', '2015-11-05');
INSERT INTO post (admin_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 3, 'video', 'Court', NULL, 'Video Title', '2015-11-05');
INSERT INTO post (admin_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 4, 'video', 'Court', NULL, 'Video Title', '2015-11-05');

INSERT INTO post (admin_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 5, 'photo', NULL, NULL, 'Photo Title', '2015-11-05');
INSERT INTO post (admin_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 6, 'photo', NULL, NULL, 'Photo Title', '2015-11-05');
INSERT INTO post (admin_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 7, 'photo', '120mm', NULL, 'Photo Title', '2015-11-05');
INSERT INTO post (admin_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 8, 'photo', '120mm', NULL, 'Photo Title', '2015-11-05');
INSERT INTO post (admin_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 9, 'photo', '120mm', 'B&W', 'Photo Title', '2015-11-05');
INSERT INTO post (admin_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 10, 'photo', '120mm', 'B&W', 'Photo Title', '2015-11-05');
INSERT INTO post (admin_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 11, 'photo', '120mm', 'Couleur', 'Photo Title', '2015-11-05');
INSERT INTO post (admin_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 12, 'photo', '120mm', 'Couleur', 'Photo Title', '2015-11-05');
INSERT INTO post (admin_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 13, 'photo', '35mm', NULL, 'Photo Title', '2015-11-05');
INSERT INTO post (admin_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 14, 'photo', '35mm', NULL, 'Photo Title', '2015-11-05');
INSERT INTO post (admin_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 15, 'photo', '35mm', 'B&W', 'Photo Title', '2015-11-05');
INSERT INTO post (admin_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 16, 'photo', '35mm', 'B&W', 'Photo Title', '2015-11-05');
INSERT INTO post (admin_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 17, 'photo', '35mm', 'Couleur', 'Photo Title', '2015-11-05');
INSERT INTO post (admin_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 18, 'photo', '35mm', 'Couleur', 'Photo Title', '2015-11-05');
INSERT INTO post (admin_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 19, 'photo', 'Digitale', NULL, 'Photo Title', '2015-11-05');
INSERT INTO post (admin_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 20, 'photo', 'Digitale', NULL, 'Photo Title', '2015-11-05');
INSERT INTO post (admin_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 21, 'photo', 'Digitale', 'iPhone', 'Photo Title', '2015-11-05');
INSERT INTO post (admin_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 22, 'photo', 'Digitale', 'iPhone', 'Photo Title', '2015-11-05');
INSERT INTO post (admin_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 23, 'photo', 'Digitale', 'Autre', 'Photo Title', '2015-11-05');
INSERT INTO post (admin_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 24, 'photo', 'Digitale', 'Autre', 'Photo Title', '2015-11-05');


INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (1, 1, 'Comment content', '2015-11-05');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (2, 2, 'Comment content', '2015-11-05');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (3, 3, 'Comment content', '2015-11-05');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (4, 4, 'Comment content', '2015-11-05');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (5, 5, 'Comment content', '2015-11-05');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (6, 1, 'Comment content', '2015-11-05');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (7, 2, 'Comment content', '2015-11-05');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (8, 3, 'Comment content', '2015-11-05');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (9, 4, 'Comment content', '2015-11-05');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (10, 5, 'Comment content', '2015-11-05');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (11, 1, 'Comment content', '2015-11-05');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (12, 2, 'Comment content', '2015-11-05');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (13, 3, 'Comment content', '2015-11-05');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (14, 4, 'Comment content', '2015-11-05');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (15, 5, 'Comment content', '2015-11-05');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (16, 1, 'Comment content', '2015-11-05');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (17, 2, 'Comment content', '2015-11-05');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (18, 3, 'Comment content', '2015-11-05');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (19, 4, 'Comment content', '2015-11-05');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (20, 5, 'Comment content', '2015-11-05');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (21, 1, 'Comment content', '2015-11-05');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (22, 2, 'Comment content', '2015-11-05');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (23, 3, 'Comment content', '2015-11-05');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (24, 4, 'Comment content', '2015-11-05');

delimiter //

CREATE PROCEDURE getMedia()
BEGIN
	SELECT * FROM media;
END//

CREATE PROCEDURE getMember()
BEGIN
	SELECT * FROM member;
END//

CREATE PROCEDURE getAdmin()
BEGIN
	SELECT * FROM admin;
END//

CREATE PROCEDURE getPost()
BEGIN
	SELECT * FROM post;
END//

CREATE PROCEDURE getComments()
BEGIN
	SELECT * FROM comments;
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

CREATE PROCEDURE setAdmin(IN mem_id_in INT)
BEGIN
	INSERT INTO admin (mem_id) 
	VALUES (mem_id_in);
END//

CREATE PROCEDURE setPost(IN admin_id_in INT,
						 IN media_id_in INT,
						 IN medium_in VARCHAR(50),
						 IN medium_type_in VARCHAR(50),
						 IN medium_spec_in VARCHAR(50),
						 IN title_in VARCHAR(50),
						 IN media_date_in DATE)
BEGIN
	INSERT INTO post (admin_id, media_id, medium, medium_type, medium_spec, title, media_date) 
	VALUES (admin_id_in, media_id_in, medium_in, medium_type_in, medium_spec_in, title_in, media_date_in);
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
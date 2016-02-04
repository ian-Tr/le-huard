DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS member;
DROP TABLE IF EXISTS media;

DROP PROCEDURE IF EXISTS getMedia;
DROP PROCEDURE IF EXISTS getPostMedia;
DROP PROCEDURE IF EXISTS getMembers;
DROP PROCEDURE IF EXISTS getMember;
DROP PROCEDURE IF EXISTS getMembers;
DROP PROCEDURE IF EXISTS getPost;
DROP PROCEDURE IF EXISTS getComments;
DROP PROCEDURE IF EXISTS setMedia;
DROP PROCEDURE IF EXISTS setMember;
DROP PROCEDURE IF EXISTS setPost;
DROP PROCEDURE IF EXISTS setComment;
DROP PROCEDURE IF EXISTS updateMemberUsername;
DROP PROCEDURE IF EXISTS updateMemberPassword;
DROP PROCEDURE IF EXISTS updateMemberEmail;
DROP PROCEDURE IF EXISTS updateMemberAbout;
DROP PROCEDURE IF EXISTS updatePost;
DROP PROCEDURE IF EXISTS updatePostMedium;
DROP PROCEDURE IF EXISTS updatePostMediumType;
DROP PROCEDURE IF EXISTS updatePostMediumSpec;
DROP PROCEDURE IF EXISTS updatePostTitle;
DROP PROCEDURE IF EXISTS updatePostMediaDate;
DROP PROCEDURE IF EXISTS deletePost;
DROP PROCEDURE IF EXISTS deleteMember;
DROP PROCEDURE IF EXISTS deleteComment;
DROP PROCEDURE IF EXISTS getMediaUrl;


CREATE TABLE media (
	id				INT					NOT NULL	AUTO_INCREMENT,
	url				VARCHAR(100)		NOT NULL UNIQUE,
	PRIMARY KEY (id)
);

CREATE TABLE member (
	id				INT					NOT NULL	AUTO_INCREMENT,
	role				VARCHAR(6)			NOT NULL,
	username		VARCHAR(20)			NOT NULL,
	password		VARCHAR(250)			NOT NULL,
	email				VARCHAR(50)			NOT NULL,
	about				VARCHAR(250),
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
	media_date		DATE				NULL,
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

INSERT INTO media (url) VALUES ('/src/client/photos/35mm/Color/American-Backpacker-Vancouver-2012.jpg');
INSERT INTO media (url) VALUES ('/src/client/photos/35mm/Color/Carousel-NA-NA.jpg');
INSERT INTO media (url) VALUES ('/src/client/photos/35mm/Color/Cherries-OliverBC-2012.jpg');
INSERT INTO media (url) VALUES ('/src/client/photos/35mm/Color/Cooking-in-a-Pot-OliverBC-2012.jpg');
INSERT INTO media (url) VALUES ('/src/client/photos/35mm/Color/Dodo-MontereyCA-2013.jpg');
INSERT INTO media (url) VALUES ('/src/client/photos/35mm/Color/Friends-NA-NA.jpg');
INSERT INTO media (url) VALUES ('/src/client/photos/35mm/Color/Hot-Springs-BC-2012.jpg');
INSERT INTO media (url) VALUES ('/src/client/photos/35mm/Color/In-the-bus-SanFrancisco-2013.jpg');
INSERT INTO media (url) VALUES ('/src/client/photos/35mm/Color/Mushroom-Beach-KelownaBC-2013.jpg');
INSERT INTO media (url) VALUES ('/src/client/photos/35mm/Color/Rainbows-n-Weed-KelownaBC-2013.jpg');
INSERT INTO media (url) VALUES ('/src/client/photos/35mm/Color/Rollin-BC-2012.jpg');
INSERT INTO media (url) VALUES ('/src/client/photos/35mm/Color/Smokin-High-In-Cali-MontereyCalifornia.jpg');
INSERT INTO media (url) VALUES ('/src/client/photos/35mm/Color/Sunset-Beach-SanFrancisco-2013.jpg');
INSERT INTO media (url) VALUES ('/src/client/photos/35mm/Color/Woods-BC-2012.jpg');
INSERT INTO media (url) VALUES ('/src/client/photos/35mm/Color/WWOOFing-BC-2012.jpg');
INSERT INTO media (url) VALUES ('/src/client/photos/120mm/B&W/Auditions-Montreal-2015.jpg');
INSERT INTO media (url) VALUES ('/src/client/photos/120mm/B&W/Backyard-BrooklynNY-Montreal.jpg');
INSERT INTO media (url) VALUES ('/src/client/photos/120mm/B&W/Breakup-RiveSudQC-2014.jpg');
INSERT INTO media (url) VALUES ('/src/client/photos/120mm/B&W/Cabaret-Chaos1-Montreal-2014.jpg');
INSERT INTO media (url) VALUES ('/src/client/photos/120mm/B&W/Cabaret-Chaos2-Montreal-2014.jpg');
INSERT INTO media (url) VALUES ('/src/client/photos/120mm/B&W/Church-Montreal-2015.jpg');
INSERT INTO media (url) VALUES ('/src/client/photos/120mm/B&W/La-Cours-Encore-Montreal-2015.jpg');
INSERT INTO media (url) VALUES ('/src/client/photos/120mm/B&W/La-Cours-Montreal-2015.jpg');
INSERT INTO media (url) VALUES ('/src/client/photos/120mm/B&W/Ma-Soeur-Montreal-2015.jpg');
INSERT INTO media (url) VALUES ('/src/client/photos/120mm/B&W/Mort-et-Amour-Montreal-2015.jpg');
INSERT INTO media (url) VALUES ('/src/client/photos/120mm/B&W/Octobre-en-Kimono-Montreal-2015.jpg');
INSERT INTO media (url) VALUES ('/src/client/photos/120mm/B&W/Post-RiveSudQC-2014.jpg');
INSERT INTO media (url) VALUES ('/src/client/photos/120mm/B&W/Probablement-La-Genese-Montreal-2015.jpg');
INSERT INTO media (url) VALUES ('/src/client/photos/120mm/B&W/Sans-Titre-2014.jpg');
INSERT INTO media (url) VALUES ('/src/client/photos/120mm/B&W/Sous-Sol-Montreal-2014.jpg');
INSERT INTO media (url) VALUES ('/src/client/photos/120mm/Color/A-la-Plage-NewyorkNY-2015.jpg');
INSERT INTO media (url) VALUES ('/src/client/photos/120mm/Color/Au-Chalet-QC-2015.jpg');
INSERT INTO media (url) VALUES ('/src/client/photos/120mm/Color/Ben-Working-Newyork-2015.jpg');
INSERT INTO media (url) VALUES ('/src/client/photos/120mm/Color/Berri-Montreal-2014.jpg');
INSERT INTO media (url) VALUES ('/src/client/photos/120mm/Color/Confort-Metro-Montreal-2014.jpg');
INSERT INTO media (url) VALUES ('/src/client/photos/120mm/Color/Habitat-67-Montreal-2014.jpg');
INSERT INTO media (url) VALUES ('/src/client/photos/120mm/Color/Metro-Montreal-2014.jpg');
INSERT INTO media (url) VALUES ('/src/client/photos/120mm/Color/Sans-Titre-NewYorkNY-2015.jpg');
INSERT INTO media (url) VALUES ('/src/client/photos/120mm/Color/Sans-Titre-QC-2015.jpg');
INSERT INTO media (url) VALUES ('/src/client/photos/120mm/Color/Tournage-en-Campagne-QC-2015.jpg');
INSERT INTO media (url) VALUES ('/src/client/photos/Disposable/B&W/Disposable-BW-1.jpg');
INSERT INTO media (url) VALUES ('/src/client/photos/Disposable/B&W/Disposable-BW-2.jpg');
INSERT INTO media (url) VALUES ('/src/client/photos/Disposable/B&W/Disposable-BW-3.jpg');
INSERT INTO media (url) VALUES ('/src/client/photos/Disposable/B&W/Disposable-BW-4.jpg');
INSERT INTO media (url) VALUES ('/src/client/photos/Disposable/B&W/Disposable-BW-5.jpg');
INSERT INTO media (url) VALUES ('/src/client/photos/Disposable/B&W/Disposable-BW-6.jpg');
INSERT INTO media (url) VALUES ('/src/client/photos/Disposable/B&W/Disposable-BW-7.jpg');
INSERT INTO media (url) VALUES ('/src/client/photos/Disposable/B&W/Disposable-BW-8.jpg');
INSERT INTO media (url) VALUES ('/src/client/photos/Disposable/B&W/Disposable-BW-9.jpg');
INSERT INTO media (url) VALUES ('/src/client/photos/Disposable/B&W/Disposable-BW-10.jpg');
INSERT INTO media (url) VALUES ('/src/client/photos/Disposable/B&W/Disposable-BW-11.jpg');
INSERT INTO media (url) VALUES ('/src/client/photos/Disposable/B&W/Disposable-BW-12.jpg');
INSERT INTO media (url) VALUES ('/src/client/photos/Disposable/B&W/Disposable-BW-13.jpg');
INSERT INTO media (url) VALUES ('/src/client/photos/Disposable/B&W/Disposable-BW-14.jpg');
INSERT INTO media (url) VALUES ('/src/client/photos/Disposable/Color/Disposable-Couleur-1.jpg');
INSERT INTO media (url) VALUES ('/src/client/photos/Disposable/Color/Disposable-Couleur-2.jpg');
INSERT INTO media (url) VALUES ('/src/client/photos/Disposable/Color/Disposable-Couleur-3.jpg');
INSERT INTO media (url) VALUES ('/src/client/photos/Disposable/Color/Disposable-Couleur-4.jpg');
INSERT INTO media (url) VALUES ('/src/client/photos/Disposable/Color/Disposable-Couleur-5.jpg');
INSERT INTO media (url) VALUES ('/src/client/photos/Disposable/Color/Disposable-Couleur-6.jpg');

INSERT INTO member (role, username, password, email) VALUES ('admin', 'admin', 'admin', 'admin@admin.com');
INSERT INTO member (role, username, password, email) VALUES ('member', 'member', 'member', 'member@member.com');
INSERT INTO member (role, username, password, email) VALUES ('member', 'eloiqs', 'eloiqs', 'eloiqs@eloiqs.com');
INSERT INTO member (role, username, password, email) VALUES ('member', 'iantr', 'iantr', 'iantr@iantr.com');
INSERT INTO member (role, username, password, email) VALUES ('member', 'tomleb', 'tomleb', 'tomleb@tomleb.com');
INSERT INTO member (role, username, password, email) VALUES ('member', 'pedro', 'pedro', 'pedro@pedro.com');
INSERT INTO member (role, username, password, email) VALUES ('member', 'random', 'random', 'random@random.com');
INSERT INTO member (role, username, password, email) VALUES ('member', 'test', 'test', 'test@test.com');

INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 1, 'photo', '35mm', 'Color', 'American Backpacker', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 2, 'photo', '35mm', 'Color', 'Carousel', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 3, 'photo', '35mm', 'Color', 'Cherries', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 4, 'photo', '35mm', 'Color', 'Cooking in a Pot', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 5, 'photo', '35mm', 'Color', 'Dodo', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 6, 'photo', '35mm', 'Color', 'Friends', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 7, 'photo', '35mm', 'Color', 'Hot Springs', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 8, 'photo', '35mm', 'Color', 'In the Bus', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 9, 'photo', '35mm', 'Color', 'Mushroom Beach', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 10, 'photo', '35mm', 'Color', 'Rainbows & Weed', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 11, 'photo', '35mm', 'Color', 'Rollin', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 12, 'photo', '35mm', 'Color', 'Smokin High', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 13, 'photo', '35mm', 'Color', 'Sunset Beach', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 14, 'photo', '35mm', 'Color', 'Woods', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 15, 'photo', '35mm', 'Color', 'WWOOFing', '2016-01-16');
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
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 31, 'photo', '120mm', 'Color', 'A la Plage', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 32, 'photo', '120mm', 'Color', 'Au Chalet', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 33, 'photo', '120mm', 'Color', 'Ben Working', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 34, 'photo', '120mm', 'Color', 'Berri', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 35, 'photo', '120mm', 'Color', 'Confort', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 36, 'photo', '120mm', 'Color', 'Habitat 67', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 37, 'photo', '120mm', 'Color', 'Metro', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 38, 'photo', '120mm', 'Color', 'Window Girl', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 39, 'photo', '120mm', 'Color', 'Reflection', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 40, 'photo', '120mm', 'Color', 'Tournage en Compagne', '2016-01-16');
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
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 55, 'photo', 'Disposable', 'Color', 'Disposable-Color-1', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 56, 'photo', 'Disposable', 'Color', 'Disposable-Color-2', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 57, 'photo', 'Disposable', 'Color', 'Disposable-Color-3', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 58, 'photo', 'Disposable', 'Color', 'Disposable-Color-4', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 59, 'photo', 'Disposable', 'Color', 'Disposable-Color-5', '2016-01-16');
INSERT INTO post (mem_id, media_id, medium, medium_type, medium_spec, title, media_date) VALUES (1, 60, 'photo', 'Disposable', 'Color', 'Disposable-Color-6', '2016-01-16');

INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (1, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (1, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (1, 2, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (1, 3, 'test', '2016-01-16');
--
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (2, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (2, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (2, 2, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (2, 3, 'test', '2016-01-16');
--
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (3, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (3, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (3, 2, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (3, 3, 'test', '2016-01-16');
--
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (4, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (4, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (4, 2, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (4, 3, 'test', '2016-01-16');
--
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (5, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (5, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (5, 2, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (5, 3, 'test', '2016-01-16');
--
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (6, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (6, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (6, 2, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (6, 3, 'test', '2016-01-16');
--
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (6, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (6, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (6, 2, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (6, 3, 'test', '2016-01-16');
--
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (7, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (7, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (7, 2, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (7, 3, 'test', '2016-01-16');
--
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (8, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (8, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (8, 2, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (8, 3, 'test', '2016-01-16');
--
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (9, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (9, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (9, 2, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (9, 3, 'test', '2016-01-16');
--
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (10, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (10, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (10, 2, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (10, 3, 'test', '2016-01-16');
--
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (11, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (11, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (11, 2, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (11, 3, 'test', '2016-01-16');
--
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (12, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (12, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (12, 2, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (12, 3, 'test', '2016-01-16');
--
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (13, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (13, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (13, 2, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (13, 3, 'test', '2016-01-16');
--
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (14, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (14, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (14, 2, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (14, 3, 'test', '2016-01-16');
--
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (15, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (15, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (15, 2, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (15, 3, 'test', '2016-01-16');
--
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (16, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (16, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (16, 2, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (16, 3, 'test', '2016-01-16');
--
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (17, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (17, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (17, 2, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (17, 3, 'test', '2016-01-16');
--
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (18, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (18, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (18, 2, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (18, 3, 'test', '2016-01-16');
--
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (19, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (19, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (19, 2, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (19, 3, 'test', '2016-01-16');
--
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (20, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (20, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (20, 2, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (20, 3, 'test', '2016-01-16');
--
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (21, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (21, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (21, 2, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (21, 3, 'test', '2016-01-16');
--
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (22, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (22, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (22, 2, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (22, 3, 'test', '2016-01-16');
--
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (23, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (23, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (23, 2, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (23, 3, 'test', '2016-01-16');
--
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (24, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (24, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (24, 2, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (24, 3, 'test', '2016-01-16');
--
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (25, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (25, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (25, 2, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (25, 3, 'test', '2016-01-16');
--
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (26, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (26, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (26, 2, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (26, 3, 'test', '2016-01-16');
--
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (27, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (27, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (27, 2, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (27, 3, 'test', '2016-01-16');
--
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (28, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (28, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (28, 2, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (28, 3, 'test', '2016-01-16');
--
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (29, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (29, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (29, 2, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (29, 3, 'test', '2016-01-16');
--
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (30, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (30, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (30, 2, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (30, 3, 'test', '2016-01-16');
--
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (31, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (31, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (31, 2, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (31, 3, 'test', '2016-01-16');
--
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (32, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (32, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (32, 2, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (32, 3, 'test', '2016-01-16');
--
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (33, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (33, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (33, 2, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (33, 3, 'test', '2016-01-16');
--
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (34, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (34, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (34, 2, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (34, 3, 'test', '2016-01-16');
--
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (35, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (35, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (35, 2, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (35, 3, 'test', '2016-01-16');
--
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (36, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (36, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (36, 2, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (36, 3, 'test', '2016-01-16');
--
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (37, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (37, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (37, 2, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (37, 3, 'test', '2016-01-16');
--
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (38, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (38, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (38, 2, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (38, 3, 'test', '2016-01-16');
--
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (39, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (39, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (39, 2, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (39, 3, 'test', '2016-01-16');
--
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (40, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (40, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (40, 2, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (40, 3, 'test', '2016-01-16');
--
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (41, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (41, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (41, 2, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (41, 3, 'test', '2016-01-16');
--
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (42, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (42, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (42, 2, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (42, 3, 'test', '2016-01-16');
--
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (43, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (43, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (43, 2, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (43, 3, 'test', '2016-01-16');
--
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (44, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (44, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (44, 2, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (44, 3, 'test', '2016-01-16');
--
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (45, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (45, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (45, 2, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (45, 3, 'test', '2016-01-16');
--
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (46, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (46, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (46, 2, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (46, 3, 'test', '2016-01-16');
--
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (47, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (47, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (47, 2, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (47, 3, 'test', '2016-01-16');
--
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (48, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (48, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (48, 2, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (48, 3, 'test', '2016-01-16');
--
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (49, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (49, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (49, 2, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (49, 3, 'test', '2016-01-16');
--
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (50, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (50, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (50, 2, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (50, 3, 'test', '2016-01-16');
--
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (51, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (51, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (51, 2, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (51, 3, 'test', '2016-01-16');
--
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (52, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (52, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (52, 2, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (52, 3, 'test', '2016-01-16');
--
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (53, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (53, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (53, 2, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (53, 3, 'test', '2016-01-16');
--
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (54, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (54, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (54, 2, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (54, 3, 'test', '2016-01-16');
--
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (55, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (55, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (55, 2, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (55, 3, 'test', '2016-01-16');
--
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (56, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (56, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (56, 2, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (56, 3, 'test', '2016-01-16');
--
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (57, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (57, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (57, 2, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (57, 3, 'test', '2016-01-16');
--
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (58, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (58, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (58, 2, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (58, 3, 'test', '2016-01-16');
--
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (59, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (59, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (59, 2, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (59, 3, 'test', '2016-01-16');
--
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (60, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (60, 1, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (60, 2, 'test', '2016-01-16');
INSERT INTO comments (post_id, mem_id, content, comment_date) VALUES (60, 3, 'test', '2016-01-16');

delimiter //

CREATE PROCEDURE getMedia()
BEGIN
	SELECT * FROM media;
END//

CREATE PROCEDURE getPostMedia()
BEGIN
	select post.id, media.id, post.medium, post.medium_type, post.medium_spec, post.title, post.media_date, media.url
	from post, media
	where post.media_id = media.id;
END//

CREATE PROCEDURE getMembers()
BEGIN
	SELECT id, username, email
	FROM member;
END//

CREATE PROCEDURE getMember()
BEGIN
	SELECT *
	FROM member;
END//

CREATE PROCEDURE getPost()
BEGIN
	SELECT * FROM post;
END//

CREATE PROCEDURE getComments()
BEGIN
	SELECT comments.id, comments.post_id, comments.content, comments.comment_date, post.medium_type, post.medium_spec, member.username
	FROM comments, post, member
	WHERE comments.post_id = post.id AND comments.mem_id = member.id;
END//

CREATE PROCEDURE setMember(IN role_in VARCHAR(6),
													 IN username_in VARCHAR(20),
                           IN password_in VARCHAR(250),
                           IN email_in VARCHAR(50))
BEGIN
	INSERT INTO member (role, username, password, email)
	VALUES (role_in, username_in, password_in, email_in);
END//

CREATE PROCEDURE setMedia(IN url_in VARCHAR(100))
BEGIN
	INSERT INTO media (url) VALUES (url_in);
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
                                      IN password_in VARCHAR(250))
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

CREATE PROCEDURE updateMemberAbout(IN id_in INT,
								   IN about_in VARCHAR(250))
BEGIN
	UPDATE member
    SET about = about_in
    WHERE id = id_in;
END//

CREATE PROCEDURE updatePost(IN id_in INT,
														IN medium_in VARCHAR(50),
														IN medium_type_in VARCHAR(50),
														IN medium_spec_in VARCHAR(50),
														IN title_in VARCHAR(50),
														IN media_date_in DATE)
BEGIN
	UPDATE post
	SET medium = medium_in,
			medium_type = medium_type_in,
			medium_spec = medium_spec_in,
			title = title_in,
			media_date = media_date_in
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

CREATE PROCEDURE getMediaUrl(IN url_in VARCHAR(100))
BEGIN
	SELECT id FROM media
	WHERE url LIKE url_in;
END//

delimiter ;

CREATE TABLE project0.users ( ---create table users in database 
	userid serial NOT NULL,
	username varchar NOT NULL,
	"password" varchar NOT NULL,
	firstname varchar NOT NULL,
	lastname varchar NOT NULL,
	email varchar NOT NULL,
	"role" int NOT NULL,
	CONSTRAINT users_pk PRIMARY KEY (userid),
	CONSTRAINT users_un UNIQUE (username),
	CONSTRAINT users_roles_fk FOREIGN KEY ("role") REFERENCES project0.roles(roleid)
);
CREATE TABLE project0.roles (
	roleid int NOT NULL,
	"role" varchar NOT NULL,

	CONSTRAINT users_pk PRIMARY KEY (roleid),
	CONSTRAINT users_un UNIQUE ("role"),
);





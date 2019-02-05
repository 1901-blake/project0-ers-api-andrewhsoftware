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
CREATE TABLE project0.roles ( --create roles table
	roleid int NOT NULL,
	"role" varchar NOT NULL,

	CONSTRAINT users_pk PRIMARY KEY (roleid),
	CONSTRAINT users_un UNIQUE ("role"),
);
CREATE TABLE project0.reimbursementtypes ( -- create reimbursementtypes table
	typeid int NOT NULL,
	"type" varchar NOT NULL,
	CONSTRAINT reimbursementtypes_pk PRIMARY KEY (typeid),
	CONSTRAINT reimbursementtypes_un UNIQUE ("type")
);
CREATE TABLE project0.reimbursementstatuses ( -- create reimbursementstatuses table
	statusid serial NOT NULL,
	status varchar NOT NULL,
	CONSTRAINT reimbursementstatuses_pk PRIMARY KEY (statusid),
	CONSTRAINT reimbursementstatuses_un UNIQUE (status)
);
CREATE TABLE project0.reimbursements ( -- set up reimbursements
	reimbursementid serial,
	author int NOT NULL,
	amount int NOT NULL,
	datesubmitted timestamp NOT NULL,
	dateresolved timestamp NOT NULL,
	description varchar NOT NULL,
	resolver int NULL,
	status int NOT NULL,
	"type" int null,
	CONSTRAINT reimbursements_pk PRIMARY KEY (reimbursementid),
	CONSTRAINT reimbursements_users_fk FOREIGN KEY (author) REFERENCES project0.users(userid),
	CONSTRAINT reimbursements_users_fk_1 FOREIGN KEY (resolver) REFERENCES project0.users(userid),
	CONSTRAINT reimbursements_reimbursementstatuses_fk FOREIGN KEY (status) REFERENCES project0.reimbursementstatuses(statusid),
	CONSTRAINT reimbursements_reimbursementtypes_fk FOREIGN KEY ("type") REFERENCES project0.reimbursementtypes(typeid)
);

insert into project0.roles (roleid, role) 
values (1,'admin');
insert into project0.roles (roleid, role) 
values (2,'finance-manager');
insert into project0.roles (roleid,role) 
values (3,'user');

insert into project0.reimbursementstatuses (status)
values ('Pending');
insert into project0.reimbursementstatuses (status)
values ('Approved');
insert into project0.reimbursementstatuses (status)
values ('Denied');

insert into project0.reimbursementtypes (typeid, type)
values (1,'Lodging');
insert into project0.reimbursementtypes (typeid,type)
values (2,'Travel');
insert into project0.reimbursementtypes (typeid,type)
values (3,'Food');
insert into project0.reimbursementtypes (typeid,type)
values (4,'Other');






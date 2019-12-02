DROP database if exists fec_estimate;
create database fec_estimate;
USE fec_estimate;

create table groups (
    group_id int not null auto_increment PRIMARY KEY,
    zipcode varchar(5) not null
);

create table dates (
    date_id int not null auto_increment PRIMARY KEY,
    month_year date
);

Create table houses (
    property_id int not null auto_increment PRIMARY KEY,
    imgurl varchar(100) not null,
    rating boolean,
    bed int,
    bath int,
    price int,
    address1 varchar(70),
    address2 varchar(30),
    zipcode varchar(5),
    sq_ft int,
    sold_date date,
    group_id int,
    foreign key (group_id) references groups (group_id)
);

create table if not exists pricing (
    property_id int,
    price int,
    date_id int,
    foreign key (property_id) references houses (property_id),
    foreign key (date_id) references dates (date_id)
);

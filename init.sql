CREATE TABLE quizzes (
    id int auto_increment primary key,
    title varchar(255) not null
);

CREATE TABLE questions (
    id int auto_increment primary key,
    quiz_id int not null,
    content varchar(255) not null,
    option_a varchar(255) not null,
    option_b varchar(255) not null,
    option_c varchar(255) not null,
    option_d varchar(255) not null,
    answer char(1) not null,
    foreign key (quiz_id) references quizzes(id) ON DELETE CASCADE
);

CREATE TABLE submissions (
    id int auto_increment primary key,
    quiz_id int not null,
    username varchar(255) not null,
    score int not null,
    foreign key (quiz_id) references quizzes(id) ON DELETE CASCADE
);

CREATE TABLE submission_answer (
    id int auto_increment primary key,
    submission_id int not null,
    question_id int not null,
    answer char(1) not null,
    is_correct boolean not null,
    foreign key (submission_id) references submissions(id) ON DELETE CASCADE,
    foreign key (question_id) references questions(id) ON DELETE CASCADE
);

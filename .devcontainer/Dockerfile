FROM ruby:3.0

WORKDIR /app

COPY Gemfile ./
COPY Gemfile.lock ./

RUN gem install bundler 
RUN bundle install

COPY . .
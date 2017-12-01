# quickFeeds

### [Live site](https://www.google.com "quickFeeds")

quickFeeds is a RSS feed parsing site. Users can add RSS URLs, create
feed collections, and browse through articles.

quickFeeds uses:
* Ruby on Rails backend
* React Redux frontend
* PostgreSQL database
* [Feedjira](https://github.com/feedjira/feedjira) gem for parsing RSS feeds


## Collections:
Feeds can be added and removed from collections

![alt collection](http://res.cloudinary.com/dhc8w148v/image/upload/c_scale,q_100,w_1000/v1512155362/Collections_ash9ul.gif "collection")


## Article Preview:
Clicking on an article opens up a preview page

![](http://res.cloudinary.com/dhc8w148v/image/upload/v1512164289/Screen_Shot_2017-12-01_at_1.37.25_PM_qnqv63.png)


## Saved Articles:
Articles can be saved and read later

![alt Read](http://res.cloudinary.com/dhc8w148v/image/upload/c_scale,q_100,w_1000/v1512156611/Read_srxgjx.gif "Read")


## Feed Parsing:
One issue faced when parsing RSS feeds is the lack of uniformity in data naming.
This app has a function that uses Ruby's metaprogramming to tackle this issue.
find_alias takes in a model attribute name, a rss_entry from Feedjira, and a
list of aliases that are used to find that property on the rss_entry.
It then checks if the rss_entry responds to any of the aliases. If it does,
it sets the model attribute equal to that value.


```Ruby
# instance methods in Article model..

def populate_attributes(rss_entry)
  # rss_entry has unknown attributes
  find_alias(:title, rss_entry, "title")
  find_alias(:url, rss_entry, "url")
  find_alias(:description, rss_entry, "description", "summary")
  find_alias(:image, rss_entry, "image", "image_url", "enclosure_url")
  find_alias(:publish_date, rss_entry, "publish_date", "published")
  self
end

def find_alias(prop, rss_item, *aliases)
  aliases.each do |ali|
    if rss_item.respond_to?(ali) && !rss_item.send(ali).nil?
      self.send((prop.to_s + "="), rss_item.send(ali))
      return rss_item.send(ali)
    end
  end
  self.send((prop.to_s + "="), "No #{prop} data available")
  false
end
```


## Work in progress
 * infinite scroll
 * delete old articles from databse
 * asynchronous calls to feed urls from rails backend

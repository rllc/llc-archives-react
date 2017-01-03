import React from 'react';
import SermonService from './SermonService';

const sermons = [
{
    "bibleText" : "Ezekiel 33",
    "bucketID" : "rockford-archives",
    "comments" : "",
    "date" : "2015-05-14T00:00:00",
    "fileUrl" : "https://s3.amazonaws.com/rockford-archives/2015/20150614_RNevala.mp3",
    "minister" : "Richard Nevala",
    "published" : true
  },
  {
    "bibleText" : "Psalms 23:1-6",
    "bucketID" : "rockford-archives",
    "comments" : "",
    "date" : "2016-04-10T00:00:00",
    "fileUrl" : "https://s3.amazonaws.com/rockford-archives/2016/20160410_RNikula.mp3",
    "minister" : "Rod Nikula",
    "published" : true
  },
  {
    "bibleText" : "Psalm 84",
    "bucketID" : "rockford-archives",
    "comments" : "",
    "date" : "2016-01-03T00:00:00",
    "fileUrl" : "https://s3.amazonaws.com/rockford-archives/2016/20160103_RWaaraniemi.mp3",
    "minister" : "Ray Waaraniemi",
    "published" : true
  },
  {
    "bibleText" : "Deuteronomy 31:6-8,12,13",
    "bucketID" : "rockford-archives",
    "comments" : "",
    "date" : "2016-03-20T00:00:00",
    "fileUrl" : "https://s3.amazonaws.com/rockford-archives/2016/20160320_RHaapala.mp3",
    "minister" : "Robert Haapala",
    "published" : true
  },
  {
    "bibleText" : "Rev. 21:1-13",
    "bucketID" : "minneapolis-archives",
    "comments" : "",
    "date" : "2016-08-28T00:00:00",
    "fileUrl" : "https://s3.amazonaws.com/minneapolis-archives/082816_RRoiko.mp3",
    "minister" : "Russell Roiko",
    "published" : true
  },
  {
    "bibleText" : "Matt. 25:31-46",
    "bucketID" : "phoenix-archives",
    "comments" : "",
    "date" : "2015-11-22T00:00:00",
    "fileUrl" : "https://s3.amazonaws.com/phoenix-archives/2015/1122_DJohnson.mp3",
    "minister" : "Dale Johnson",
    "published" : true
  },
  {
    "bibleText" : "Matt. 18: 15-20",
    "bucketID" : "rockford-archives",
    "comments" : "",
    "date" : "2016-06-26T00:00:00",
    "fileUrl" : "https://s3.amazonaws.com/rockford-archives/2016/20160626_RNevala.mp3",
    "minister" : "Rick Nevala",
    "published" : true
  },
  {
    "bibleText" : "Revelations 3:1-6",
    "bucketID" : "phoenix-archives",
    "comments" : "",
    "date" : "2016-07-31T00:00:00",
    "fileUrl" : "https://s3.amazonaws.com/phoenix-archives/2016/0731_RSorvala.mp3",
    "minister" : "Rory Sorvala",
    "published" : true
  },
  {
    "bibleText" : "Mark 10: 13-16",
    "bucketID" : "llc-outlook-archives",
    "comments" : "Michaelmas",
    "date" : "2016-10-02T00:00:00",
    "fileUrl" : "https://s3.amazonaws.com/llc-outlook-archives/20161002 Robert Haapala.mp3",
    "minister" : "Robert Haapala",
    "published" : true
  }
];

it('filters by congregation when search term is specified and congregation is selected', () => {
  const filteredSermons = SermonService.filter(sermons, 'Matt', {'bucketID' : 'rockford-archives'})
  expect(filteredSermons.length).toBe(1)
  expect(filteredSermons[0].minister).toBe('Rick Nevala')
  expect(filteredSermons[0].bibleText).toBe('Matt. 18: 15-20')
});

it('filters all sermons by search term if search term is specified and no congregation is selected', () => {
  const filteredSermons = SermonService.filter(sermons, 'Matt', null)
  expect(filteredSermons.length).toBe(2)

  expect(filteredSermons[0].date).toBe('2016-06-26T00:00:00')
  expect(filteredSermons[1].date).toBe('2015-11-22T00:00:00')
});

it('filters by congregation when search term is not specified and congregation is selected', () => {
  const filteredSermons = SermonService.filter(sermons, null, {'bucketID' : 'rockford-archives'})
  expect(filteredSermons.length).toBe(5)
  for (var index in filteredSermons) {
    expect(filteredSermons[index].bucketID).toBe('rockford-archives')
  }

  expect(filteredSermons[0].date).toBe('2016-06-26T00:00:00')
  expect(filteredSermons[1].date).toBe('2016-04-10T00:00:00')
  expect(filteredSermons[2].date).toBe('2016-03-20T00:00:00')
  expect(filteredSermons[3].date).toBe('2016-01-03T00:00:00')
  expect(filteredSermons[4].date).toBe('2015-05-14T00:00:00')
});

it('grabs the latest sermons when no search term is specified and no congregation is selected', () => {
  const filteredSermons = SermonService.filter(sermons, null, null)
  expect(filteredSermons.length).toBe(9)
  expect(filteredSermons[0].date).toBe('2016-10-02T00:00:00')
  expect(filteredSermons[1].date).toBe('2016-08-28T00:00:00')
  expect(filteredSermons[2].date).toBe('2016-07-31T00:00:00')
});

it('search is case insensitive', () => {
  const filteredSermons = SermonService.filter(sermons, 'nevala', null)
  expect(filteredSermons.length).toBe(2)
  expect(filteredSermons[0].date).toBe('2016-06-26T00:00:00')
  expect(filteredSermons[1].date).toBe('2015-05-14T00:00:00')
});

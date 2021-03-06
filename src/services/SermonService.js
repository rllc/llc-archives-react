
class SermonService {

  static findById(sermons, id) {
    return sermons[sermons.map(function(x) {return x.key; }).indexOf(id)];
  }

    static getUnpublishedSermons(sermons, selectedCongregationBucketId) {
      if (selectedCongregationBucketId === 'all') {
        selectedCongregationBucketId = null;
      }
      var filteredSermons = sermons.filter((sermon) => (sermon.published === false))

      if (selectedCongregationBucketId) {
        filteredSermons = filteredSermons.filter((sermon) => (
          (sermon.bucketID === selectedCongregationBucketId)
        ))
      }

      // always sort by date in decsending order
      return filteredSermons.sort((a, b) => (
          new Date(b.date) - new Date(a.date)
      ));
    }

    static filter(sermons, searchTerm, selectedCongregationBucketId) {
      if (selectedCongregationBucketId === 'all') {
        selectedCongregationBucketId = null;
      }
      var filteredSermons = sermons.filter((sermon) => (sermon.published === true))
      if (searchTerm) {
        searchTerm = searchTerm.toLowerCase()
      }
      if (searchTerm && selectedCongregationBucketId) {
        filteredSermons = filteredSermons.filter((sermon) => (
          (
            (sermon.bucketID === selectedCongregationBucketId) &&
            (
              (sermon.comments.toLowerCase().search(searchTerm) !== -1) ||
              (sermon.minister.toLowerCase().search(searchTerm) !== -1) ||
              (sermon.bibleText.toLowerCase().search(searchTerm) !== -1)
            )
          )
        ))
      }
      // searching all sermons
      else if (searchTerm) {
        filteredSermons = filteredSermons.filter((sermon) => (
          (
            (sermon.comments.toLowerCase().search(searchTerm) !== -1) ||
            (sermon.minister.toLowerCase().search(searchTerm) !== -1) ||
            (sermon.bibleText.toLowerCase().search(searchTerm) !== -1)
          )
        ))
      }
      else if (selectedCongregationBucketId) {
        filteredSermons = filteredSermons.filter((sermon) => (
          (sermon.bucketID === selectedCongregationBucketId)
        ))
      }

      // always sort by date in decsending order
      return filteredSermons.sort((a, b) => (
          new Date(b.date) - new Date(a.date)
      ));
    }

}

export default SermonService

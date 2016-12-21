
class SermonService {

    static filter(sermons, searchTerm, selectedCongregation) {
      var filteredSermons = sermons.filter((sermon) => (sermon.published === true))
      if (searchTerm) {
        searchTerm = searchTerm.toLowerCase()
      }
      if (searchTerm && selectedCongregation) {
        filteredSermons = filteredSermons.filter((sermon) => (
          (
            (sermon.bucketID === selectedCongregation.bucketID) &&
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
      else if (selectedCongregation) {
        filteredSermons = filteredSermons.filter((sermon) => (
          (sermon.bucketID === selectedCongregation.bucketID)
        ))
      }

      // always sort by date in decsending order
      return filteredSermons.sort((a, b) => (
          new Date(b.date) - new Date(a.date)
      ));
    }

}

export default SermonService

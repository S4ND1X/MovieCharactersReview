import CharactersDAO from "../dao/characters.DAO";

export default class CharactersController {

  static async apiGetCharacters(req, res, next) {

    //If passed characterPerPage or page in request url if not then set default
    const charactersPerPage = req.query.charactersPerPage
      ? parseInt(req.query.charactersPerPage, 10)
      : 20;
    const page = req.query.page ? parseInt(req.query.page) : 0;

    let filters = {};

    //If filters are present on request url
    if (req.query.name) {
      filters.name = req.query.name;
    } else if (req.query.gender) {
      filters.gender = req.query.gender;
    } else if (req.query.house) {
      filters.house = req.query.house;
    }

    //Get documents based on filters, page and charactersPerPage trough DAO
    const {
      charactersList,
      totalNumCharacters,
    } = await CharactersDAO.getCharacters({
      filters,
      page,
      charactersPerPage,
    });


    //Build request response based of DAO response
    let response = {
      characters: charactersList,
      page: page,
      filters: filters,
      entries_per_page: charactersPerPage,
      total_result: totalNumCharacters,
    };

    res.status(200).json(response);
  }
}

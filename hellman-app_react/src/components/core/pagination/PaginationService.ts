import PaginationSettings from "./PaginationSettings";

class PaginationService {
    setPageSettings(page: number, perPage: number, totalRecords : number) {
        let settings : PaginationSettings = {
            page: page,
            perPage: perPage,
            totalRecords: totalRecords
        }

        return settings;
    }
}

export default new PaginationService();
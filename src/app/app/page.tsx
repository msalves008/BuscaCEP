import { SearchedZipCodesDataTable } from './_components/searched-zipcodes-data-table'
import { getSearchedZipCodes } from './actions'

export default async function SearchedZipCodes() {
  const searchedZipCodes = await getSearchedZipCodes()
  return <SearchedZipCodesDataTable searchedZipCodes={searchedZipCodes} />
}

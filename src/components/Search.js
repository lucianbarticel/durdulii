import { Input } from 'antd';
import { debounce } from 'lodash';
import { useDataManager } from '../services';

export const Search = () => {
  const {
    setSearchFilter,
  } = useDataManager()

  const handleOnChange = e => {
    setSearchFilter(e.target.value)
  }

  return (
    <Input placeholder="Cauta Aliment" onChange={debounce(handleOnChange, 300)}  />
  )
}
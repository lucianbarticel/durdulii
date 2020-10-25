import { createContext, useContext, useEffect, useState } from 'react';
import data from '../data/data';

const FiltersContext = createContext({})

function arrayMin(arr) {
  return arr.reduce(function (p, v) {
    return ( p < v ? p : v );
  }, []);
}

function arrayMax(arr) {
  return arr.reduce(function (p, v) {
    return ( p > v ? p : v );
  }, []);
}

const filterEntries = ({ entries, filters }) => {
  const {
    categories,
    caloriesRange,
    proteinsRange,
    carbsRange,
    fatsRange,
    fibresRange,
    searchTerm,
  } = filters;

  return entries.filter(entry => {

    const includesSearchTerm = searchTerm.length > 0 ? RegExp(searchTerm.toLowerCase()).test(entry.aliment.toLowerCase()) : true;
    
    return categories.includes(entry.categorie) &&
    +entry.calorii >= caloriesRange[0] &&
    +entry.calorii <= caloriesRange[1] &&
    +entry.proteine >= proteinsRange[0] &&
    +entry.proteine <= proteinsRange[1] &&
    +entry.carbohidrati >= carbsRange[0] &&
    +entry.carbohidrati <= carbsRange[1] &&
    +entry.lipide >= fatsRange[0] &&
    +entry.lipide <= fatsRange[1] &&
    +entry.fibre >= fibresRange[0] &&
    +entry.fibre <= fibresRange[1] &&
    includesSearchTerm
  }
    
  )
}

const orderEntries = ({entries, criterion}) => {
  return entries.sort((a,b) => a[criterion] - b[criterion])
}

export const DataManagerContext = ({ children }) => {

  const maximums = {
    calories: arrayMax(data.map(entry=> Math.floor(entry.calorii))),
    proteins: Math.min(50, arrayMax(data.map(entry=> Math.floor(entry.proteine)))),
    carbs: Math.min(50, arrayMax(data.map(entry=> Math.floor(entry.carbohidrati)))),
    fats: Math.min(50, arrayMax(data.map(entry=> Math.floor(entry.lipide)))),
    fibres: Math.min(50, arrayMax(data.map(entry=> Math.floor(entry.fibre)))),
  }

  const categories = Array.from(new Set(data.map(entry => entry.categorie)));

  const [entries, setEntries] = useState(data)

  const minCalories = arrayMin(entries.map(entry=> Math.floor(entry.calorii)));
  const maxCalories = arrayMax(entries.map(entry=> Math.floor(entry.calorii)));
  const minProteins = arrayMin(entries.map(entry=> Math.floor(entry.proteine)));
  const maxProteins = Math.min(50, arrayMax(entries.map(entry=> Math.floor(entry.proteine))));
  const minCarbs = arrayMin(entries.map(entry=> Math.floor(entry.carbohidrati)));
  const maxCarbs = Math.min(50, arrayMax(entries.map(entry=> Math.floor(entry.carbohidrati))));
  const minFats = arrayMin(entries.map(entry=> Math.floor(entry.lipide)));
  const maxFats = Math.min(50, arrayMax(entries.map(entry=> Math.floor(entry.lipide))));
  const minFibres = arrayMin(entries.map(entry=> Math.floor(entry.fibre)));
  const maxFibres = Math.min(50, arrayMax(entries.map(entry=> Math.floor(entry.fibre))));

  const [selectedCategoriesFilter, setSelectedCategoriesFilter] = useState(categories)
  const [caloriesFilter, setCaloriesFilter] = useState([minCalories, maxCalories])
  const [proteinsFilter, setProteinsFilter] = useState([minProteins, maxProteins])
  const [carbsFilter, setCarbsFilter] = useState([minCarbs, maxCarbs])
  const [fatsFilter, setFatsFilter] = useState([minFats, maxFats])
  const [fibresFilter, setFibresFilter] = useState([minFibres, maxFibres])
  const [searchFilter, setSearchFilter] = useState('')

  useEffect(() => {
    const filteredEntries = filterEntries({entries: data, filters: {
      categories: selectedCategoriesFilter,
      caloriesRange: caloriesFilter,
      proteinsRange: proteinsFilter,
      carbsRange: carbsFilter,
      fatsRange: fatsFilter,
      fibresRange: fibresFilter,
      searchTerm: searchFilter,
    }})
    const orderedEntries = orderEntries({ entries: filteredEntries, criterion: 'calorii'})
    setEntries(orderedEntries)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
      selectedCategoriesFilter,
      caloriesFilter,
      proteinsFilter,
      carbsFilter,
      searchFilter,
      fatsFilter,
      fibresFilter,
    ])

  const context = {
    data: entries,
    categories,
    selectedCategoriesFilter,
    caloriesRange: [minCalories, maxCalories],
    proteinsRange: [minProteins, maxProteins],
    carbsRange: [minCarbs, maxCarbs],
    fatsRange: [minFats, maxFats],
    fibresRange: [minFibres, maxFibres],
    maximums,
    searchFilter,
    setSelectedCategoriesFilter,
    setCaloriesFilter,
    setProteinsFilter,
    setCarbsFilter,
    setSearchFilter,
    setFatsFilter,
    setFibresFilter,
  }

  return (
    <FiltersContext.Provider value={context}>
      { children }
    </FiltersContext.Provider>
  )
}

export const useDataManager = () => useContext(FiltersContext)
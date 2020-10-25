import { Fragment } from 'react';
import { Slider, Card, Checkbox } from 'antd';
import { useDataManager } from '../services'
export const Filters = () => {
  const {
    categories,
    selectedCategoriesFilter,
    caloriesRange,
    proteinsRange,
    carbsRange,
    fatsRange,
    fibresRange,
    setFatsFilter,
    setFibresFilter,
    setSelectedCategoriesFilter,
    setCaloriesFilter,
    setProteinsFilter,
    setCarbsFilter,
    maximums,
  } = useDataManager()

  const allCategoriesChecked = categories.length === selectedCategoriesFilter.length
  const categoriesCheckIndeterminate = 
    categories.length !== selectedCategoriesFilter.length &&
    selectedCategoriesFilter.length > 0

  const handleCheckAll = e => {
    const cats = e.target.checked ? categories : []
    setSelectedCategoriesFilter(cats)
  }  

  const checkAll = allCategoriesChecked ? 'Debifeaza toate': 'Bifeaza toate'

  const percentileTip = value => `${value}%`
  const gramsTip = value => `${value}g`

  return (
      <Fragment>
        <Card title="Categorii">
          <div className="site-checkbox-all-wrapper">
            <Checkbox
              indeterminate={categoriesCheckIndeterminate}
              onChange={handleCheckAll}
              checked={allCategoriesChecked}
            >
              {checkAll}
            </Checkbox>
          </div>
          <Checkbox.Group 
            options={categories}
            defaultValue={categories}
            value={selectedCategoriesFilter}
            onChange={setSelectedCategoriesFilter}
          />

        </Card>
        <Card title="Grasimi">
          <Slider
            range
            defaultValue={fatsRange}
            tooltipVisible
            onAfterChange={setFatsFilter}
            max={maximums.fats}
            tipFormatter={percentileTip}
          />
        </Card>
        <Card title="Carbohidrati">
          <Slider
            range
            defaultValue={carbsRange}
            tooltipVisible
            onAfterChange={setCarbsFilter}
            max={maximums.carbs}
            tipFormatter={percentileTip}
          />
        </Card>
        <Card title="Calorii">
          <Slider
            range
            defaultValue={caloriesRange}
            tooltipVisible
            onAfterChange={setCaloriesFilter}
            max={maximums.calories}
            tipFormatter={gramsTip}
          />
        </Card>
        <Card title="Proteine">
          <Slider
            range
            defaultValue={proteinsRange}
            tooltipVisible
            onAfterChange={setProteinsFilter}
            max={maximums.proteins}
            tipFormatter={percentileTip}
          />
        </Card>
        <Card title="Fibre">
          <Slider
            range
            defaultValue={fibresRange}
            tooltipVisible
            onAfterChange={setFibresFilter}
            max={maximums.fibres}
            tipFormatter={percentileTip}
          />
        </Card>
      </Fragment>

  )
}
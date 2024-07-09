import _ from "lodash"

const sortData= (data, field, type)=> {
    return _.orderBy(data, [field], [type])
}

export default sortData
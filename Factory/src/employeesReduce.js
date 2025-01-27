const initialState = {
    employees: [],
};

const employeesReducer = (state = initialState, action) => {
    if (action.type === "LOAD") {
        console.log(action.payload)
        return { ...state, employees: action.payload };

    }
    else {
        return state;

    }
};

export default employeesReducer;

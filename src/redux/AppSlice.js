import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const production_url = "https://screentime-api.onrender.com/"
console.log(process.env.NODE_ENV);
const get_api_url = () => {
    if (process.env.NODE_ENV === 'production'){
        return production_url
    }else{
        const url = "http://localhost:5000/"
        return url
    }
}

const url = get_api_url()

export const getAppsAsync = createAsyncThunk(
	'apps/getAppsAsync',
	async () => {
		const resp = await fetch(`${url}api/apps`);
		if (resp.ok) {
			const apps = await resp.json();
			return { apps };
		}
	}
);

export const getAppDetails = createAsyncThunk('apps/getAppDetail', 
    async (payload, thunkAPI) => {
        try {
            const response = await fetch(`${url}api/apps/${payload.app}`)
            if (response.ok) {
                const apps = await response.json()
                return { apps }
            }
            if (response.status === 404) {
                return thunkAPI.rejectWithValue(response.status)
            }
        }  catch (err) {
            if (!err.response) {
              throw err
            }
            return thunkAPI.rejectWithValue(err.response.data)
        }
        
    }
)

export const getDates = createAsyncThunk('apps/getDates', 
    async (payload) => {
        const response = await fetch(`${url}api/apps/dates`)
        if (response.ok){
            const dates = await response.json()
            return { dates }
        }
    }
)

export const getAppsOnDate = createAsyncThunk('apps/getAppsOndate',
    async(payload, thunkAPI) => {
        const date = payload.date
        const response = await fetch(`${url}api/apps/dates/${date}`)
        if (response.ok){
            const appsOnDate = await response.json()
            return { appsOnDate }
        }
        if (!response.ok){
            return thunkAPI.rejectWithValue(response.status)
        }
    }
)

export const AppSlice = createSlice({
	name: 'fetchAppsData',
	initialState: {
        apps : [{}],
        appdetails: [{}],
        appdetailss: [{}],
        dates: [],
        appsOnDate: [{}],
        isLoading: false,
        is404: false,
        appNameOrder: "",
        appRuntimeOrder: "",
        appDateOrder: "",
        dateOrder: ""
    },
	reducers: {
        reset: (state) => {
            state.isLoading = false
            state.is404 = false
        },
        updateTimeSpan: (state, action) => {
            const timespan = action.payload.new_timespan
            const old = action.payload.apps
            const id = action.payload.id

            const isActive = true

            const new_apps = old.map( ({isActive, ...x}) => x );

            const apps = new_apps.map((item) => {
                if (item._id === id){
                    return { ...item, timespan, isActive}
                } else{
                    return item ;
                }
            })
            
            return state =  {
                apps: apps,
                appNameOrder: state.appNameOrder,
                appRuntimeOrder: state.appRuntimeOrder,
            }
        },

        updateAppDetailsTimeSpan: (state, action) => {
            const timespan = action.payload.new_timespan
            const old = action.payload.apps
            const id = action.payload.id

            const isActive = true

            const new_apps = old.map( ({isActive, ...x}) => x );

            const apps = new_apps.map((item) => {
                if (item._id === id){
                    return { ...item, timespan, isActive}
                } else{
                    return item ;
                }
            })

            return state =  {
                appdetails: apps,
                appdetailss: state.appdetailss,
                appRuntimeOrder: state.appRuntimeOrder,
                appDateOrder: state.appDateOrder
            }
        },
        sortAppName: (state, action) => {
            var apps = action.payload.apps

            if(state.appNameOrder === "DSC"){
                apps = apps.slice().sort((a,b) => (a.app < b.app ? 1 : -1))

                return state = {
                    apps: apps,
                    appNameOrder : "ASC",
                    appRuntimeOrder: state.appRuntimeOrder
                }
            }
            
            if(state.appNameOrder === "ASC"){
                apps = apps.slice().sort((a,b) => (a.app > b.app ? 1 : -1))

                return state = {
                    apps : apps, 
                    appNameOrder : "DSC",
                    appRuntimeOrder: state.appRuntimeOrder
                }
            }
        },
        sortRuntime: (state, action) => {
            var apps = action.payload.apps

            if(state.appRuntimeOrder === "DSC"){
                apps = apps.slice().sort((a,b) => (a.runtime < b.runtime ? 1 : -1))

                return state = {
                    apps: apps,
                    appdetails : apps,
                    appRuntimeOrder : "ASC",
                    appNameOrder: state.appNameOrder,
                    appDateOrder: state.appDateOrder,
                    appdetailss: state.appdetailss
                }
            }
            
            if(state.appRuntimeOrder === "ASC"){
                apps = apps.slice().sort((a,b) => (a.runtime > b.runtime ? 1 : -1))
                
                return state = {
                    apps : apps, 
                    appdetails : apps,
                    appRuntimeOrder : "DSC",
                    appNameOrder: state.appNameOrder,
                    appDateOrder: state.appDateOrder,
                    appdetailss: state.appdetailss
                }
            }
        },
        sortAppDate: (state, action) => {
            var apps = action.payload.apps

            if(state.appDateOrder === "DSC"){
                apps = apps.slice().sort((a, b) => (a < b ? 1 : -1))

                return state = {
                    appdetails : apps,
                    appDateOrder : "ASC",
                    appdetailss : apps,
                    appRuntimeOrder: state.appRuntimeOrder
                }
            }
            
            if(state.appDateOrder === "ASC"){
                apps = apps.slice().sort((a, b) => (a < b ? 1 : -1))
                
                return state = {
                    appdetails : apps,
                    appdetailss : apps,
                    appDateOrder : "DSC",
                    appRuntimeOrder: state.appRuntimeOrder
                }
            }
        },

        sortDate: (state, action) =>{
            var dates = action.payload.dates
            if (state.dateOrder === "DSC"){
                dates = [...dates].reverse();
                
                return state =  {
                    dateOrder: "ASC",
                    dates: dates
                }
            }
            
            if (state.dateOrder === "ASC"){
                dates = [...dates].reverse();

                return state = {
                    dateOrder: "DSC",
                    dates: dates
                }
            }
        }

	},
	extraReducers: (builder) => {
        builder
            .addCase(getAppsAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAppsAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.apps = action.payload.apps
                state.appNameOrder = "DSC"
                state.appRuntimeOrder = "DSC"
            })
            .addCase(getAppDetails.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAppDetails.fulfilled, (state, action) => {
                state.isLoading = false
                state.appdetails = action.payload.apps
                state.appdetailss = action.payload.apps
                state.appRuntimeOrder = "DSC"
                state.appDateOrder = "DSC"
            })
            .addCase(getAppDetails.rejected, (state, action) => {
                state.is404 = true
                state.isLoading = false
            })
            .addCase(getDates.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getDates.fulfilled, (state, action) => {
                state.isLoading = false
                state.dateOrder = "DSC"
                state.dates = action.payload.dates
            })
            .addCase(getAppsOnDate.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAppsOnDate.fulfilled, (state, action) => {
                state.isLoading = false
                state.appsOnDate = action.payload.appsOnDate
            })
            .addCase(getAppsOnDate.rejected, (state, action) => {
                state.isLoading = false
                if (action.payload === 404){
                    state.is404 = true
                }
            })
	},
});

export const { updateTimeSpan, updateAppDetailsTimeSpan, sortAppName, sortRuntime, sortAppDate, sortDate } = AppSlice.actions;

export default AppSlice.reducer;
// R-square relation - Average number of mentally unhealthy days Vs the following fields
let bar1Labels = ["percent_frequent_physical_distress",
                  "percent_smokers",
                  "percent_fair_or_poor_health",
                  "percent_below_poverty", 
                  "percentile_rank_below_poverty",
                  "median_household_income",
                  "percentile_rank_per_capita_income", 
                  "percentile_rank_no_highschool_diploma"];

let bar1Values = [0.3444, 0.8265, 0.753, 0.6555, 0.6554, 0.6368, 0.5497, 0.6278];
let y1 = bar1Values.sort((a,b) => b-a);
console.log("bar1:", y1);

// R-square relation - Percent frequent mental distress Vs the following fields
let bar2 = ["percent_frequent_physical_distress",            
            "percent_smokers", 
            "percent_fair_or_poor_health",
            "percent_below_poverty",
            "percentile_rank_per_capita_income",
            "per_capita_income",
            "percentile_rank_social_vulnerability",            
            "percentile_rank_no_highschool_diploma"];

let bar2Values = [0.4061, 0.949, 0.819, 0.8023, 0.7801, 0.6109, 0.5089, 0.6007];
let y2 = bar2Values.sort((a,b) => b-a);

console.log("bar2:", y2);
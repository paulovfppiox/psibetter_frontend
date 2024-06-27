// RulesFactory.js

export default class RulesFactory 
{

    static async loadRules(componentName) {
        let ruleSet;

        try {
            ruleSet = await import(`@/utils/rules/${componentName}Rules.js`);
            console.log( JSON.stringify( ruleSet ) );


        } catch (error) {
        console.error(`Error loading rules for ${componentName}:`, error);
        }

        return ruleSet.default || {};
    }
}
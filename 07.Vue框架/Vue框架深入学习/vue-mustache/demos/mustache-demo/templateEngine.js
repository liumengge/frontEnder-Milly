import parseTemplateTokens from './parseTemplateTokens.js'
import renderTemplate from './renderTemplate.js'

export default {
    render(templateStr, data) {
        // 将模板字符串组成tokens
        const tokens = parseTemplateTokens(templateStr)
        // 将组成的tokens与数据进行结合，生成DOM字符串
        let domStr =  renderTemplate(tokens, data)
        // 返回DOM字符串
        return domStr
    }
}
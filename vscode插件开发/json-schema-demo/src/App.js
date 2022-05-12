import "./styles.css";
import { Typography } from "antd";
import FormRender, { useForm } from "form-render";

const schema = {
  type: "object",
  properties: {
    type: {
      title: "物料类型",
      type: "string",
      enum: ["block", "page"],
      enumNames: ["区块", "页面"],
      widget: "radio",
      default: "block"
    },
    reDirName: {
      title: "重命名",
      type: "string",
      placeholder: "xxx-xxx命名格式",
      hidden: '{{formData.type === "page"}}',
      description: "对生成的文件夹或者文件重新命名，默认使用物料名"
    },
    pagePath: {
      title: "页面路径",
      type: "string",
      props: {},
      placeholder: "相对于项目根目录",
      required: true,
      hidden: '{{formData.type === "block"}}'
    },
    pageName: {
      title: "页面名",
      type: "string",
      props: {},
      required: true,
      placeholder: "示例：query-table",
      hidden: '{{formData.type === "block"}}'
    },
    isInstall: {
      title: "安装依赖",
      type: "boolean",
      widget: "checkbox",
      default: false
    },
    installType: {
      title: "安装方式",
      type: "string",
      enum: ["npm", "yarn"],
      enumNames: ["npm", "yarn"],
      widget: "radio",
      hidden: "{{!formData.isInstall}}",
      default: "npm"
    }
  },
  labelWidth: 120,
  displayType: "row"
};

const { Title } = Typography;

export default function App() {
  const form = useForm();

  return (
    <div className="App">
      <Title>jsonschema</Title>
      <FormRender schema={schema} form={form} />
    </div>
  );
}

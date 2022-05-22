public class SingleObject {
  // 私有化构造函数，外部不能new，只有内部可以new
  private SingleObject() {}

  // 唯一被new出来的对象, java是强类型的语言，instance 为 SingleObject 类型的
  private static SingleObject instance = null;

  // 获取对象的唯一接口
  public static SingleObject getInstance() {
    if (instance == null) {
      // 只被 new 一次
      instance = new SingleObject();
    }
    return instance;
  }

  // 对象方法
  public void login() {
    System.out.println("login...");
  }
  public static void main(String[] args) {
    // 不合法的构造函数
    // 编译时错误：构造函数 SingleObject() 是不可见的
    // SingleObject object = new SingleObject();

    // 获取唯一可用的对象
    SingleObject object2 = SingleObject.getInstance();
    object2.login();
  }
} 
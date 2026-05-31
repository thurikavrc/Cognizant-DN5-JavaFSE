import java.lang.reflect.Method;

class Demo {
    public void greet() {
        System.out.println("Hello");
    }
}

public class ReflectionExample {

    public static void main(String[] args)
            throws Exception {

        Class<?> cls = Class.forName("Demo");

        Object obj = cls.getDeclaredConstructor()
                .newInstance();

        Method[] methods = cls.getDeclaredMethods();

        for (Method m : methods) {
            System.out.println(m.getName());
        }

        Method method = cls.getMethod("greet");

        method.invoke(obj);
    }
}
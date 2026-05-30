import java.util.Scanner;

public class Casting {
    public static void main(String[] args) {
        Scanner s = new Scanner(System.in);

        System.out.println("Enter an Integer value:");
        int n = s.nextInt();
        double d = n;
        System.out.println("DoubleValue:" + d);

        System.out.println("Enter a double value:");
        double x= s.nextDouble();
        int y = (int) x;
        System.out.println("Integer value:" + y);
    }
}
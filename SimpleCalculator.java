import java.util.Scanner;

public class SimpleCalculator {
    public static void main(String[] args) {
        Scanner s = new Scanner(System.in);
        System.out.println("Enter the first number:");
        double num1 = s.nextDouble();
        System.out.println("Enter the second number:");
        double num2 = s.nextDouble();
        double result = 0;
        System.out.println("Enter the operator:");
       
        switch (s.next()) {
            case "+":
                result = num1 + num2;
                break;
            case "-":
                result = num1 - num2;
                break;
            case "*":
                result = num1 * num2;
                break;
            case "/":
                result = num1 / num2;
                break;
            default:
                System.out.println("Invalid operator");
        }
        System.out.println("Result :" + result);
    }
}
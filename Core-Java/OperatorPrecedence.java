public class OperatorPrecedence {
    public static void main(String[] args) {

        // Multiplication (*) has higher precedence than addition (+)
        // 5 * 2 = 10, then 10 + 10 = 20
        int result1 = 10 + 5 * 2;

        // Parentheses () are evaluated first
        // (10 + 5) = 15, then 15 * 2 = 30.
        int result2 = (10 + 5) * 2;

        // Division (/) and multiplication (*) are evaluated before
        // addition (+) and subtraction (-)
        // 4 / 2 = 2 and 3 * 2 = 6
        // Then evaluate from left to right:
        // 20 - 2 + 6 = 18 + 6 = 24
        int result3 = 20 - 4 / 2 + 3 * 2;

        System.out.println("10 + 5 * 2 = " + result1);
        System.out.println("(10 + 5) * 2 = " + result2);
        System.out.println("20 - 4 / 2 + 3 * 2 = " + result3);
    }
}
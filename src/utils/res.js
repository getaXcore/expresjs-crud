export default function Response(values, message, res) {
    var data = {
        'status': 200,
        'message': message,
        'values': values
    };
    res.send(data);
    res.end();
}